import { NextURL } from "next/dist/server/web/next-url";

export const isApi = (path: string) => path.includes('/api/')

export const createMiddlewareUrl = (pathname: string, nextUrl: NextURL) => {
  const url = nextUrl.clone()
  url.pathname = pathname

  return url;
}