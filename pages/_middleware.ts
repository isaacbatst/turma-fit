import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import getSession from "../lib/session";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ['/', '/personal/admin']

  const  { nextUrl: { pathname } } = req;
  
  const session = await getSession(req);
  
  if (!session && protectedRoutes.find(route => route.includes(pathname))) {
    return NextResponse.redirect("/api/auth/signin")
  }

  if(session && pathname.includes('/login') ){
    return NextResponse.redirect("/");
  }
}