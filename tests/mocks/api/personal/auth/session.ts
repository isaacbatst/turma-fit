import { ResponseResolver, RestContext, RestRequest } from "msw";
import { PERSONAL_WITHOUT_ADVICE_COOKIE, PERSONAL_WITH_ADVICE_COOKIE, UNAMED_USER_COOKIE, USER_WITHOUT_ROLE_COOKIE, UNAMED_USER_WITHOUT_ROLE_COOKIE } from "../../../cookies";
import { LOGGED_SESSION_MOCK, LOGGED_SESSION_UNAMED_MOCK, LOGGED_SESSION_WITHOUT_ROLE } from "../../../sessions";

export const getAuthSessionResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  if (req.cookies.auth === PERSONAL_WITHOUT_ADVICE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_MOCK))
  }

  if (req.cookies.auth === PERSONAL_WITH_ADVICE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_MOCK))
  }

  if (req.cookies.auth === UNAMED_USER_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_UNAMED_MOCK))
  }

  if (req.cookies.auth === USER_WITHOUT_ROLE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_WITHOUT_ROLE))
  }

  if (req.cookies.auth === UNAMED_USER_WITHOUT_ROLE_COOKIE) {
    return
  }

  return res(ctx.json(LOGGED_SESSION_MOCK))
}