import { rest } from "msw";
import { setupServer } from 'msw/node';
import { getPersonalAdvicesResolver } from "./mocks/api/personal/advices";
import { getAuthSessionResolver } from "./mocks/api/personal/auth/session";

const server = setupServer(
  // server.use should set custom responses for specific tests
  rest.get('/api/personal/advices', getPersonalAdvicesResolver),
  rest.get(`${process.env.NEXTAUTH_URL}/api/auth/session`, getAuthSessionResolver),
)

export default server
