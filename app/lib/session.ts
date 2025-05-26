"use server";

// lib/session.ts
import {
  defaultSession,
  SessionData,
  sessionOptions,
} from "@/components/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  console.log(session);

  return session;
};
