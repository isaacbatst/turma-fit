import { NextApiRequest, NextApiResponse } from "next";
import { Controller, HttpRequest } from "../interfaces";

export class NextApiHandlerAdapter {
  constructor(private controller: Controller) {

  }
  
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const { statusCode, body } = await this.controller.handle(httpRequest);
    
    if(!body) return res.status(statusCode).end();

    return res.status(statusCode).json(body);
  }
}