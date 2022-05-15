import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from 'cookie'
import { Controller, HttpRequest } from "../../interfaces";

export class NextApiHandlerAdapter {
  constructor(private controller: Controller) {

  }
  
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      headers: req.headers
    }

    const { statusCode, body, cookies } = await this.controller.handle(httpRequest);
    
    if(!body) return res.status(statusCode).end();
    if(!cookies) return res.status(statusCode).json(body);

    Object.entries(cookies).forEach(([key, value]) => {
      this.setCookie(res, key, value);
    })

    return res.status(statusCode).json(body);
  }

  private setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
  ) => {
    const stringValue =
      typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  
    if (options.maxAge) {
      options.expires = new Date(Date.now() + options.maxAge)
      options.maxAge /= 1000
    }
  
    res.setHeader('Set-Cookie', serialize(name, stringValue, options))
  }
}