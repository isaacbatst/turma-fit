import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookie = req.headers.get('cookie')

  const session = cookie 
    ? await getSession({ req: { headers: { cookie } } as any }) 
    : null

  if(session && isUserWithoutName(session) && isNotFillProfilePage(req) && isNotApi(req)){
    return redirectTo('/fill-profile', req);
  }

  if(session && isHome(req)){
    return redirectTo('/personal/students', req);
  }

  return NextResponse.next();
}

const isUserWithoutName = (session: Session) => !session.user.name
const isNotFillProfilePage = (req: NextRequest) => req.nextUrl.pathname !== '/fill-profile'
const isNotApi = (req: NextRequest) => !req.nextUrl.pathname.includes('/api/')
const isHome = (req: NextRequest) => req.nextUrl.pathname === '/'

const redirectTo = (pathname: string, req: NextRequest) => {
  const url = req.nextUrl.clone()
  url.pathname = pathname

  return NextResponse.redirect(url);
}