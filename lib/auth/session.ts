import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "../database/prisma";

const SESSION_COOKIE = "compmind_session";
const SESSION_DURATION_DAYS = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  );

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return {
    expiresAt,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const session = await prisma.session.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    cookieStore.delete(SESSION_COOKIE);

    return null;
  }

  return session.user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    const tokenHash = hashToken(token);

    await prisma.session.deleteMany({
      where: {
        tokenHash,
      },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}
