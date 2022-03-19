import { rest } from "msw"
import { setupServer } from 'msw/node';
import * as Mocks from './HomePage';
import * as Cookies from './Cookies';

const server = setupServer(
  // server.use should set custom responses for specific tests
  rest.get('/api/personal/advices', (req, res, ctx) => {
    if (req.cookies.auth === Cookies.PERSONAL_WITH_ADVICE) {
      return res(ctx.status(200), ctx.json(Mocks.existingAdvices))
    }

    if (req.cookies.auth === Cookies.PERSONAL_WITHOUT_ADVICE) {
      return res(ctx.status(200), ctx.json([]))
    }

    if (req.cookies.auth === Cookies.UNAMED_USER){
      return res(ctx.status(200), ctx.json([]))
    }

    return res(ctx.status(401))
  }),
  rest.get(`${process.env.NEXTAUTH_URL}/api/auth/session`, (req, res, ctx) => {
    if (req.cookies.auth === Cookies.PERSONAL_WITHOUT_ADVICE) {
      return res(ctx.json(Mocks.loggedSession))
    }

    if (req.cookies.auth === Cookies.PERSONAL_WITH_ADVICE) {
      return res(ctx.json(Mocks.loggedSession))
    }

    if (req.cookies.auth === Cookies.UNAMED_USER){
      return res(ctx.json(Mocks.loggedSessionUnamed))
    }

    return res(ctx.json(Mocks.loggedSession))
  }),
)

export default server
