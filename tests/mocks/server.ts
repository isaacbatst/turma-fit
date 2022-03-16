import { rest } from "msw"
import { setupServer } from 'msw/node';
import * as Mocks from './listSection';

const server = setupServer(
  // server.use should set custom responses for specific tests
  rest.get('/api/personal/advices', (req, res, ctx) => {
    if(req.cookies.auth === 'personal-with-advice'){
      return res(ctx.status(200), ctx.json(Mocks.existingAdvices))
    }

    if(req.cookies.auth === 'personal-without-advice'){
      return res(ctx.status(200), ctx.json([]))
    }

    return res(ctx.status(401))
  }),
  rest.get(`${process.env.NEXTAUTH_URL}api/auth/session`, (req, res, ctx) => {
    return res(ctx.json(Mocks.loggedSession))
  })
)

export default server
