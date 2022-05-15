import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { SWRConfig } from "swr";

const USER = { name: 'Testinho RTL' }

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ user: USER }))
  }),
)

const makeSut = () => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <HomePage />
    </SWRConfig>
  )
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HomePage', () => {
  it('should render loading', () => {
    render(makeSut())

    const loadingElement = screen.getByRole('status');

    expect(loadingElement).toBeInTheDocument()
  })

  describe('Giver user is logged', () => {
    // TODO replace for user workout plans list 
    it('should render test user name', async () => {
      render(makeSut());
      
      const userName = await screen.findByText(/Testinho RTL/);
  
      expect(userName).toBeInTheDocument();
    });
  })

  describe('Giver user is not logged', () => {
    it('should render create user form', async () => {
      server.use(
        rest.get('/api/user', (req, res, ctx) => {
          return res(ctx.status(401))
        }),
      )

      render(makeSut());

      const createUserForm = await screen.findByRole('form', { name: 'Criar conta' });

      expect(createUserForm).toBeInTheDocument();
    });
  })
})