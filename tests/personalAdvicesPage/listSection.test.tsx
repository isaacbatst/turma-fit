import { act, queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
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

  beforeEach(async () => {
    await act(async () => {
      const { render, page } = await getPage({
        route: '/personal/advices',
      })
      render();
    });
  })

  it('renders list section', async () => {
    await screen.findByRole('region', { name: "Seção de Listagem" })
  })

  describe('Given Personal has Advices', () => {
    it('renders list element', async () => {
      await screen.findByRole('list', { name: 'Lista de Alunos' })
    })

    
    it('renders adviced student name', async () => {
      const [ { student } ] = Mocks.existingAdvices;

      await screen.findByRole('listitem', { name: student.user.name as string })
    })    
  })
})