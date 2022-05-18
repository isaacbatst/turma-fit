import { CookiesHandler } from "@application/api/common/CookiesHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { Controller, HttpRequest } from "../../interfaces";

export class NextApiHandlerAdapter {
  constructor(private controller: Controller) {

  }
  
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies
    }

    const { statusCode, body, cookies } = await this.controller.handle(httpRequest);
    
    if(!body) return res.status(statusCode).end();
    if(!cookies) return res.status(statusCode).json(body);

    Object.entries(cookies).forEach(([key, { value, daysToExpire }]) => {
      CookiesHandler.setCookie(res, key, value, daysToExpire);
    })

    return res.status(statusCode).json(body);
  }
}