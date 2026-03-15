import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      fullName: string;
      authMode: "demo" | "google";
    };
  }

  interface User {
    authMode?: "demo" | "google";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    appUserId?: string;
    fullName?: string | null;
    authMode?: "demo" | "google";
  }
}
