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



describe('Home Page - List Advices Section', () => {

  beforeEach(async () => {
    await act(async () => {
      const { render } = await getPage({
        route: '/',
      })
      render();
    });
  })

  it('renders list section', async () => {
    const section = await screen.findByRole('region', { name: "Seção de Listagem" })
    expect(section).toBeInTheDocument();
  })

  describe('Given User is a Personal', () => {
    describe('Given Personal has Advices', () => {
      it('renders list element', async () => {
        const list = await screen.findByRole('list', { name: 'Lista de Alunos' })
        expect(list).toBeInTheDocument();
      })
      
      it('renders adviced student name', async () => {
        const [ { student } ] = Mocks.existingAdvices;
  
        const [first] = await screen.findAllByRole('listitem')
        
        expect(first).toHaveAccessibleName(student.user.name as string);
      })    
  
      it('renders adviced student without name', async () => {
        const [_, second] = await screen.findAllByRole('listitem')
        
        expect(second).toHaveAccessibleName('Nome não cadastrado');
      })  
    })

    describe('Given Personal has no Advices', () => {

    })
  })
})