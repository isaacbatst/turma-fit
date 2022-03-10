import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareUrl } from '../lib/url';
import { isApi, pathShouldBeRedirected } from '../middlewares/redirect';

export default withAuth(
  function middleware(req: NextRequest) {
    const pathToRedirectTo = pathShouldBeRedirected(req.nextUrl.pathname);

    if (pathToRedirectTo) {
      const url = createMiddlewareUrl(pathToRedirectTo, req.nextUrl);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }, {
    callbacks: {
      authorized: async ({ token, req }) => {
        if (isApi(req.nextUrl.pathname) || token) {
          return true;
        }

        return false;
      }
    }
  }
)
