import { CookieSerializeOptions, serialize } from 'cookie'

interface ResponseWithSetHeader {
  setHeader(name: string, value: string | number | readonly string[]): any
}

export class CookiesHandler {
  static SECONDS_IN_A_DAY =  24 * 60 * 60;

  static setCookie (
    res: ResponseWithSetHeader,
    name: string,
    value: unknown,
    daysToExpire?: number,
    options: Omit<CookieSerializeOptions, 'expires' | 'maxAge'> = {}
  ) {
    const cookieOptions: CookieSerializeOptions = options;

    const stringValue =
      typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
 

    if(daysToExpire) {
      const expiresDate = new Date(Date.now() + CookiesHandler.daysToMiliseconds(daysToExpire));
      cookieOptions.expires = expiresDate

      cookieOptions.maxAge = CookiesHandler.daysToSeconds(daysToExpire)
    }  

    res.setHeader('Set-Cookie', serialize(name, stringValue, cookieOptions))
  }

  static removeCookie(
    name: string, 
    res: ResponseWithSetHeader,
  ) {
    const stringValue = "expired";
    
    res.setHeader('Set-Cookie', serialize(name, stringValue, {
      maxAge: 0
    }))
  }

  static daysToSeconds(days: number) {
    return days * this.SECONDS_IN_A_DAY
  }

  static daysToMiliseconds(days: number) {
    return CookiesHandler.daysToSeconds(days) * 1000
  }
}