import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { SWRConfig } from "swr";
import HomePage from "../HomePage";

jest.mock('../components/UserHomeView.tsx', () => {
  const UserHomeViewMock = () => <div>UserHomeView</div>

  return UserHomeViewMock
})

jest.mock('../components/CreateUserForm.tsx', () => {
  const CreateUserFormMock = () => <div>CreateUserForm</div>

  return CreateUserFormMock
})

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ user: {} }))
  }),
  rest.get('/api/user/:id/workout-plans', (req, res, ctx) => {
    return res(ctx.json({ workoutPlans: [] }))
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
    it('should render UserHomeView',async () => {
      render(makeSut());

      const userHomeView = await screen.findByText('UserHomeView');

      expect(userHomeView).toBeInTheDocument();
    })
  })

  describe('Giver user is not logged', () => {
    it('should render create user form', async () => {
      server.use(
        rest.get('/api/user', (req, res, ctx) => {
          return res(ctx.status(401))
        }),
      )

      render(makeSut());

      const createUserForm = await screen.findByText('CreateUserForm');

      expect(createUserForm).toBeInTheDocument();
    });
  })
})