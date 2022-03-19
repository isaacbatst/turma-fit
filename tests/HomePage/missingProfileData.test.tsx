import { screen } from '@testing-library/react';
import * as Cookies from '../mocks/Cookies';
import renderPage from '../renderPage';

describe('Home Page - Missing Profile Data', () => {
  describe('Given User has no name', () => {

    beforeEach(async () => {
      document.cookie = Cookies.getAuthCookie(Cookies.UNAMED_USER);
    })     

    it('should render fill name input', async () => {
      await renderPage('/')

      const fillNameLabel = screen.getByRole("textbox", { name: "Como você se chama?" });
      expect(fillNameLabel).toBeInTheDocument();
    });
  })

  describe('Given User is not a Personal And User is not a Student', () => {
    beforeEach(async () => {
      document.cookie = Cookies.getAuthCookie(Cookies.USER_WITHOUT_ROLE);
    })  

    it('should render role radio buttons', async () => {
      await renderPage('/')

      const studentButton = screen.getByRole("radio", { name: "Aluno" });
      expect(studentButton).toBeInTheDocument();
      
      const personalButton = screen.getByRole("radio", { name: "Personal" });
      expect(personalButton).toBeInTheDocument();
    });
  })
})
