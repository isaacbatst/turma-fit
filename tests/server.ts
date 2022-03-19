import { rest } from "msw"
import { setupServer } from 'msw/node';
import { PERSONAL_WITH_ADVICE_COOKIE, PERSONAL_WITHOUT_ADVICE_COOKIE, UNAMED_USER_COOKIE, USER_WITHOUT_ROLE_COOKIE, UNAMED_USER_WITHOUT_ROLE_COOKIE } from "./mocks/cookies";
import { EXISTING_ADVICES_MOCK } from "./mocks/advices";
import { LOGGED_SESSION_MOCK, LOGGED_SESSION_UNAMED_MOCK, LOGGED_SESSION_WITHOUT_ROLE } from "./mocks/sessions";


const server = setupServer(
  // server.use should set custom responses for specific tests
  rest.get('/api/personal/advices', (req, res, ctx) => {
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
  }),
  rest.get(`${process.env.NEXTAUTH_URL}/api/auth/session`, (req, res, ctx) => {
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

    if(req.cookies.auth === UNAMED_USER_WITHOUT_ROLE_COOKIE){
      return 
    }

    return res(ctx.json(LOGGED_SESSION_MOCK))
  }),
)

export default server
