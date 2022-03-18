import { screen } from '@testing-library/react';
import * as Mocks from '../mocks/HomePage';
import * as Cookies from '../mocks/Cookies';
import renderPage from '../renderPage';

describe('Home Page - List Advices Section', () => {
  it('renders list section', async () => {
    document.cookie = Cookies.getAuthCookie(Cookies.PERSONAL_WITH_ADVICE);
    await renderPage('/');

    const section = await screen.findByRole('region', { name: "Seção de Listagem" })
    expect(section).toBeInTheDocument();
  })

  describe('Given User is a Personal', () => {
    describe('Given Personal has Advices', () => {
      beforeEach(async () => {
        document.cookie = Cookies.getAuthCookie(Cookies.PERSONAL_WITH_ADVICE);
      })        

      it('renders list element', async () => {
        await renderPage('/');

        const list = await screen.findByRole('list', { name: 'Lista de Alunos' })
        expect(list).toBeInTheDocument();
      })
      
      it('renders adviced student name', async () => {
        await renderPage('/');

        const [first] = await screen.findAllByRole('listitem')

        const [ { student } ] = Mocks.existingAdvices;
        expect(first).toHaveAccessibleName(student.user.name as string);
      })    
  
      it('renders adviced student without name', async () => {
        await renderPage('/');

        const [_, second] = await screen.findAllByRole('listitem')
        expect(second).toHaveAccessibleName('Nome não cadastrado');
      })  
    })

    describe('Given Personal has no Advices', () => {
      beforeEach(async () => {
        document.cookie = Cookies.getAuthCookie(Cookies.PERSONAL_WITHOUT_ADVICE);
      })   
      
      it('renders no advice', async () => {  
        await renderPage('/')

        const el = await screen.findByText('Nenhum aluno encontrado')
        expect(el).toBeInTheDocument();
      })
    })
  })
})