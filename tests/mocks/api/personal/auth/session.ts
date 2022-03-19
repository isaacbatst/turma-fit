import { ResponseResolver, RestContext, RestRequest } from "msw";
import { PERSONAL_WITHOUT_ADVICE_COOKIE, PERSONAL_WITH_ADVICE_COOKIE, USER_WITHOUT_NAME_COOKIE, USER_WITHOUT_ROLE_COOKIE, USER_WITHOUT_NAME_AND_ROLE_COOKIE } from "../../../cookies";
import { LOGGED_SESSION_MOCK, LOGGED_SESSION_WITHOUT_NAME_MOCK, LOGGED_SESSION_WITHOUT_NAME_AND_ROLE, LOGGED_SESSION_WITHOUT_ROLE } from "../../../sessions";

export const getAuthSessionResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  if (req.cookies.auth === PERSONAL_WITHOUT_ADVICE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_MOCK))
  }

  if (req.cookies.auth === PERSONAL_WITH_ADVICE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_MOCK))
  }

  if (req.cookies.auth === USER_WITHOUT_NAME_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_WITHOUT_NAME_MOCK))
  }

  if (req.cookies.auth === USER_WITHOUT_ROLE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_WITHOUT_ROLE))
  }

  if (req.cookies.auth === USER_WITHOUT_NAME_AND_ROLE_COOKIE) {
    return res(ctx.json(LOGGED_SESSION_WITHOUT_NAME_AND_ROLE))
  }

  return res(ctx.json(LOGGED_SESSION_MOCK))
}