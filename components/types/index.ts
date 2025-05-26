import { SessionOptions } from "iron-session";

export interface ReviewRow {
  id: number;
  name: string;
  email: string;
  client_id: string;
  google_screenshot_url: string;
  trustpilot_screenshot_url: string;
  form_status: string;
  submitted_at: string;
}

export interface LoginRequest {
  email: string;
  password: string; 
  isAdmin: boolean;
}

export interface SessionData {
  userEmail?: string;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "client-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV,
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
