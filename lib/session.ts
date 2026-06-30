import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  userName?: string;
  userEmail?: string;
  userRole?: "USER" | "ADMIN";
  isLoggedIn?: boolean;
  adminId?: string;
  isAdminLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "affordable-housing-portal-secret-key-2024",
  cookieName: "ahp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
