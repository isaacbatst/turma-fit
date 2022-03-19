import { screen } from '@testing-library/react';
import { getAuthCookie, USER_WITHOUT_NAME_COOKIE, USER_WITHOUT_ROLE_COOKIE } from '../../mocks/cookies';
import renderPage from '../../renderPage';

describe('Home Page - Missing Profile Data', () => {
  describe('Given User has no name', () => {

    beforeEach(async () => {
      document.cookie = getAuthCookie(USER_WITHOUT_NAME_COOKIE);
    })     

    it('should render fill name input', async () => {
      await renderPage('/')

      const fillNameLabel = screen.getByRole("textbox", { name: "Como você se chama?" });
      expect(fillNameLabel).toBeInTheDocument();
    });
  })

  describe('Given User is not a Personal And User is not a Student', () => {
    beforeEach(async () => {
      document.cookie = getAuthCookie(USER_WITHOUT_ROLE_COOKIE);
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
