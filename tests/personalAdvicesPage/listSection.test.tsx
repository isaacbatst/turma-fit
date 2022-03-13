import { act, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getPage } from 'next-page-tester';
import * as Mocks from './listSection.mocks';


const server = setupServer(
  // server.use should set custom responses for specific tests
  rest.get('/api/personal/advices', (req, res, ctx) => {
    return res(ctx.json(Mocks.existingAdvices))
  }),
  rest.get(`${process.env.NEXTAUTH_URL}api/auth/session`, (req, res, ctx) => {
    return res(ctx.json(Mocks.loggedSession))
  })
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Personal Advices Page - List Section', () => {
  it('renders page header', async () => {
    await act(async () => {
      const { render } = await getPage({
        route: '/personal/advices',
      })

      render()
    });

    await screen.findByText('Turma Fit')

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })
    // expect(heading).toBeInTheDocument()
  })
})