import { randomBytes, scryptSync } from "crypto";
import { NextResponse } from "next/server";
import { createSession } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/database/prisma";

type SignupBody = {
  username?: unknown;
  email?: unknown;
  password?: unknown;
  termsAccepted?: unknown;
};

function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

function validateUsername(username: string) {
  if (!username) return "Please enter a username.";

  if (username.length < 3) {
    return "Username must be at least 3 characters.";
  }

  if (username.length > 20) {
    return "Username must be 20 characters or fewer.";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers and underscores.";
  }

  return null;
}

function validateEmail(email: string) {
  if (!email) {
    return "Please enter your email address.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

function validatePassword(password: string) {
  if (!password) {
    return "Please enter a password.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const termsAccepted = body.termsAccepted === true;

    const usernameError = validateUsername(username);

    if (usernameError) {
      return NextResponse.json(
        {
          error: usernameError,
          field: "username",
        },
        { status: 400 },
      );
    }

    const emailError = validateEmail(email);

    if (emailError) {
      return NextResponse.json(
        {
          error: emailError,
          field: "email",
        },
        { status: 400 },
      );
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      return NextResponse.json(
        {
          error: passwordError,
          field: "password",
        },
        { status: 400 },
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        {
          error: "You must agree to the terms to continue.",
          field: "terms",
        },
        { status: 400 },
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          error: "That username is already taken.",
          field: "username",
        },
        { status: 409 },
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          error: "An account with that email already exists.",
          field: "email",
        },
        { status: 409 },
      );
    }

    const passwordHash = createPasswordHash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        displayName: username,
        role: "PLAYER",
        status: "ACTIVE",
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Automatically sign the new user in.
    await createSession(user.id);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while creating your account.",
      },
      { status: 500 },
    );
  }
}