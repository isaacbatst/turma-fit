import { NextRequestWithAuth } from 'next-auth';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareUrl } from '../lib/url';
import { isApi, validate } from '../services/middleware/validation';

export default withAuth(
  function middleware(req: NextRequest) {
    const pathToRedirect = validate({ path: req.nextUrl.pathname });

    if (pathToRedirect) {
      const url = createMiddlewareUrl(pathToRedirect, req.nextUrl);
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
