import { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '../services/validation';

// While NextAuth has not typed request param inside WithAuth
type NextRequestWithAuth = NextRequest & { nextauth: { token: JWT } };

export default withAuth(function middleware(req: NextRequest) {
  const { nextauth: { token } } = req as NextRequestWithAuth;

  const pathToRedirect = validate({ token, path: req.nextUrl.pathname });

  if(pathToRedirect){
    return redirectTo(pathToRedirect, req.nextUrl)
  }

  return NextResponse.next();
}, {
  callbacks: {
    authorized: async ({ token }) => {
      if (token) {
        return true;
      }

      return false;
    }
  }
})

const redirectTo = (pathname: string, nextUrl: NextURL) => {
  const url = nextUrl.clone()
  url.pathname = pathname

  return NextResponse.redirect(url);
}


