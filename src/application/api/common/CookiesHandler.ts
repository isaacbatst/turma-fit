import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

interface ResponseWithSetHeader {
  setHeader(name: string, value: string | number | readonly string[]): any
}

export class CookiesHandler {
  static setCookie (
    res: ResponseWithSetHeader,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
  ) {
    const stringValue =
      typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  
    if (options.maxAge) {
      options.expires = new Date(Date.now() + options.maxAge)
      options.maxAge /= 1000
    }
  
    res.setHeader('Set-Cookie', serialize(name, stringValue, options))
  }
}