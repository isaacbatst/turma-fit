import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { SWRConfig } from "swr";

const USER = { id: 'any_user_id', name: 'Testinho RTL' };
const WORKOUT_PLAN = { id: 'any_workout_plan_id' }

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ user: USER }))
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
    // TODO replace for user workout plans list 
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