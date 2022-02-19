import { NextURL } from "next/dist/server/web/next-url";

export const createMiddlewareUrl = (pathname: string, nextUrl: NextURL) => {
  const url = nextUrl.clone()
  url.pathname = pathname

  return url;
}