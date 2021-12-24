import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const protectedRoutes = ['/']

  const  { nextUrl: { pathname } } = req;
  
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET || '',
    secureCookie:
    process.env.NEXTAUTH_URL?.startsWith("https://") ??
    !!process.env.VERCEL_URL,
  })

  if (!session && protectedRoutes.find(route => route.includes(pathname))) {
    return NextResponse.redirect("/api/auth/signin")
  }

  if(session && pathname.includes('/login') ){
    return NextResponse.redirect("/");
  }
}