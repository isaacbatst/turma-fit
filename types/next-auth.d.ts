import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

declare module "next-auth/jwt" {
  interface JWT {
    sub?: Number;
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string;
      email: string;
      image?: string;
      isPersonal: boolean;
      isStudent: boolean;
    }
  }

  // While NextAuth does not type request param inside WithAuth
  type NextRequestWithAuth = NextRequest & { nextauth: { token: JWT } };
}