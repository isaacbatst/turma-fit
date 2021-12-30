import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default function getSession(req: NextRequest){
  return getToken({
    req,
    secret: process.env.JWT_SECRET || '',
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  })

}