import { timingSafeEqual, scryptSync } from "crypto";
import { NextResponse } from "next/server";
import { createSession } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/database/prisma";

type LoginBody = {
  identifier?: unknown;
  password?: unknown;
};

function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  try {
    const derivedKey = scryptSync(password, salt, 64);
    const storedKey = Buffer.from(key, "hex");

    if (derivedKey.length !== storedKey.length) {
      return false;
    }

    return timingSafeEqual(derivedKey, storedKey);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!identifier) {
      return NextResponse.json(
        {
          error: "Please enter your username or email.",
          field: "identifier",
        },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          error: "Please enter your password.",
          field: "password",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: identifier,
          },
          {
            email: identifier.toLowerCase(),
          },
        ],
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        {
          error: "Invalid username/email or password.",
        },
        { status: 401 },
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          error:
            user.status === "SUSPENDED"
              ? "This account has been suspended."
              : "This account is not currently active.",
        },
        { status: 403 },
      );
    }

    const passwordValid = verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          error: "Invalid username/email or password.",
        },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while signing you in.",
      },
      { status: 500 },
    );
  }
}
