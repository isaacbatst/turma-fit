import { getSession } from "next-auth/react";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, ev: NextFetchEvent){
  const cookie = req.headers.get('cookie')

  const session = cookie 
    ? await getSession({ req: { headers: { cookie } } as any }) 
    : null
  
  if(session && session.user.name){
    return NextResponse.redirect('/', 302)
  }

  NextResponse.next()
}