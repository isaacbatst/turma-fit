import { screen } from '@testing-library/react';
import { getAuthCookie, PERSONAL_WITHOUT_ADVICE_COOKIE, PERSONAL_WITH_ADVICE_COOKIE } from '../../mocks/cookies';
import { EXISTING_ADVICES_MOCK } from '../../mocks/advices';
import renderPage from '../../renderPage';

describe('Home Page - List Advices Section', () => {
  it('renders list section', async () => {
    document.cookie = getAuthCookie(PERSONAL_WITH_ADVICE_COOKIE);
    await renderPage('/');

    const section = await screen.findByRole('region', { name: "Seção de Listagem" })
    expect(section).toBeInTheDocument();
  })

  describe('Given User is a Personal', () => {
    describe('Given Personal has Advices', () => {
      beforeEach(async () => {
        document.cookie = getAuthCookie(PERSONAL_WITH_ADVICE_COOKIE);
      })        

      it('renders list element', async () => {
        await renderPage('/');

        const list = await screen.findByRole('list', { name: 'Lista de Alunos' })
        expect(list).toBeInTheDocument();
      })
      
      it('renders adviced student name', async () => {
        await renderPage('/');

        const [first] = await screen.findAllByRole('listitem')

        const [ { student } ] = EXISTING_ADVICES_MOCK;
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
        document.cookie = getAuthCookie(PERSONAL_WITHOUT_ADVICE_COOKIE);
      })   
      
      it('renders no advice', async () => {  
        await renderPage('/')

        const el = await screen.findByText('Nenhum aluno encontrado')
        expect(el).toBeInTheDocument();
      })
    })
  })
})