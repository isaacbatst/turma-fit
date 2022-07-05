import { CookiesHandler } from "@application/api/common/CookiesHandler";
import { CookiesNames } from "@application/api/common/CookiesNames";
import { NextApiResponse } from "next";

export class LogoutUserController {
  static handle(res: NextApiResponse) {
    try {
      CookiesHandler.removeCookie(
        CookiesNames.AUTHORIZATION,
        res
      )
  
      return res.status(204).end();
    } catch (error) {
      console.error(error);

      return res.status(500).end();
    }
  }
}