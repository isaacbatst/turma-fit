import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { SWRConfig } from "swr";
import HomePage from "./HomePage";
import { USER, WORKOUT_PLAN } from "./HomePageDataMocks";

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json(USER))
  }),
  rest.get('/api/user/:id/workout-plans', (req, res, ctx) => {
    return res(ctx.json({ workoutPlans: [ WORKOUT_PLAN ] }))
  })
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
    it('should render user workout plans section', async () => {
      render(makeSut());
      
      const userName = await screen.findByRole('region', { name: 'Meus planos de treino' });
  
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