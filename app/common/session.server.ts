import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: number;
  role: "USER" | "WRITER";
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      domain:
        process.env.NODE_ENV === "production"
          ? "yourwebsite.com" // ✅ Change this to your actual domain when set up
          : undefined,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET] as string[],
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    userId: session.get("userId"),
    role: session.get("role"),
  };
}

export { getSession, commitSession, destroySession };
