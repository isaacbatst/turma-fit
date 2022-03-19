import { ResponseResolver, RestContext, RestRequest } from "msw";
import { EXISTING_ADVICES_MOCK } from "../../advices";
import { PERSONAL_WITHOUT_ADVICE_COOKIE, PERSONAL_WITH_ADVICE_COOKIE } from "../../cookies";

export const getPersonalAdvicesResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  if (req.cookies.auth === PERSONAL_WITH_ADVICE_COOKIE) {
    return res(ctx.status(200), ctx.json(EXISTING_ADVICES_MOCK))
  }

  if (req.cookies.auth === PERSONAL_WITHOUT_ADVICE_COOKIE) {
    return res(ctx.status(200), ctx.json([]))
  }

  if (req.cookies.auth) {
    return res(ctx.status(200), ctx.json([]))
  }

  return res(ctx.status(401))
}