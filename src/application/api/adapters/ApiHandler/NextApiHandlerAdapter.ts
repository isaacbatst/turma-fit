import { CookiesHandler } from "@application/api/common/CookiesHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { Controller, HttpRequest } from "../../interfaces";

export class NextApiHandlerAdapter<Response> {
  constructor(private controller: Controller<Response>) {

  }
  
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies
    }

    const { statusCode, body, cookies } = await this.controller.handle(httpRequest);

    if(cookies) {
      Object.entries(cookies).forEach(([key, { value, daysToExpire }]) => {
        CookiesHandler.setCookie(res, key, value, daysToExpire, {
          path: '/'
        });
      })
    }
    
    if(!body) return res.status(statusCode).end();

    return res.status(statusCode).json(body);
  }
}