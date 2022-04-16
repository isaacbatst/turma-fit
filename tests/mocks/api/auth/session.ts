import { ResponseResolver, RestContext, RestRequest } from "msw";
import { Session } from "next-auth";
import { PERSONAL_WITHOUT_ADVICE_COOKIE, PERSONAL_WITH_ADVICE_COOKIE, USER_WITHOUT_NAME_COOKIE, USER_WITHOUT_ROLE_COOKIE, USER_WITHOUT_NAME_AND_ROLE_COOKIE, STUDENT_WITH_ADVICE_COOKIE } from "../../cookies";
import { createMockedResponse, CustomMockedResponse } from "../../responses";
import { LOGGED_SESSION_MOCK, LOGGED_SESSION_WITHOUT_NAME_MOCK, LOGGED_SESSION_WITHOUT_NAME_AND_ROLE_MOCK, LOGGED_SESSION_WITHOUT_ROLE_MOCK, LOGGED_STUDENT_MOCK } from "../../sessions";

const cookiesMapToResponse: Record<string, CustomMockedResponse<Session>> = {
  [PERSONAL_WITHOUT_ADVICE_COOKIE]: createMockedResponse<Session>(LOGGED_SESSION_MOCK),
  [PERSONAL_WITH_ADVICE_COOKIE]: createMockedResponse<Session>(LOGGED_SESSION_MOCK),
  [STUDENT_WITH_ADVICE_COOKIE]: createMockedResponse<Session>(LOGGED_STUDENT_MOCK),
  [USER_WITHOUT_NAME_COOKIE]: createMockedResponse<Session>(LOGGED_SESSION_WITHOUT_NAME_MOCK),
  [USER_WITHOUT_ROLE_COOKIE]: createMockedResponse<Session>(LOGGED_SESSION_WITHOUT_ROLE_MOCK),
  [USER_WITHOUT_NAME_AND_ROLE_COOKIE]: createMockedResponse<Session>(LOGGED_SESSION_WITHOUT_NAME_AND_ROLE_MOCK),
  default: createMockedResponse<Session>(LOGGED_SESSION_MOCK),
}

export const getAuthSessionResolver: ResponseResolver<RestRequest, RestContext> = (req, res, ctx) => {
  if(cookiesMapToResponse[req.cookies.auth]){
    const { json } = cookiesMapToResponse[req.cookies.auth];
    return res(ctx.json(json))
  }

  const { json } = cookiesMapToResponse.default;

  return res(ctx.json(json))
}