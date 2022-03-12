import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest, ev: NextFetchEvent){
  try {
    if(req.nextUrl.pathname.includes('/api/auth/')){
      return NextResponse.next();
    }

    const token = await getToken({ req: { cookies: req.cookies } } as any);

    if(!token || !token.email){
      const response = new Response(null, {
        status: 401
      })

      return response
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error)

    const response = new Response(null, {
      status: 500,
    });

    return response;
  }
}