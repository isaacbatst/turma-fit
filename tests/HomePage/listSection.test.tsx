import { act, screen } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import * as Mocks from '../mocks/listSection';

const renderPage = async () => await act(async () => {
  const { render } = await getPage({
    route: '/',
    wrappers: 'tests/wrappers.tsx'
  })
  render();
});

describe('Home Page - List Advices Section', () => {
  it('renders list section', async () => {
    document.cookie = 'auth=personal-with-advice';
    await renderPage();

    const section = await screen.findByRole('region', { name: "Seção de Listagem" })
    expect(section).toBeInTheDocument();
  })

  describe('Given User is a Personal', () => {
    describe('Given Personal has Advices', () => {
      beforeAll(async () => {
        document.cookie = 'auth=personal-with-advice';
      })        

      it('renders list element', async () => {
        await renderPage();

        const list = await screen.findByRole('list', { name: 'Lista de Alunos' })
        expect(list).toBeInTheDocument();
      })
      
      it('renders adviced student name', async () => {
        await renderPage();

        const [first] = await screen.findAllByRole('listitem')

        const [ { student } ] = Mocks.existingAdvices;
        expect(first).toHaveAccessibleName(student.user.name as string);
      })    
  
      it('renders adviced student without name', async () => {
        await renderPage();

        const [_, second] = await screen.findAllByRole('listitem')
        expect(second).toHaveAccessibleName('Nome não cadastrado');
      })  
    })

    describe('Given Personal has no Advices', () => {
      beforeAll(async () => {
        document.cookie = 'auth=personal-without-advice';
      })   
      
      it('renders no advice', async () => {  
        await renderPage()

        const el = await screen.findByText('Nenhum aluno encontrado')
        expect(el).toBeInTheDocument();
      })
    })
  })
})