import { screen } from "@testing-library/react"
import { getAuthCookie, USER_WITHOUT_NAME_AND_ROLE_COOKIE } from "../../mocks/cookies"
import renderPage from "../../renderPage"
import userEvent from '@testing-library/user-event'

describe("Fill Profile Page - Form", () => {
  describe('Given user filled name and role', () => { 
    beforeEach(() => {
      document.cookie = getAuthCookie(USER_WITHOUT_NAME_AND_ROLE_COOKIE)
    })

    it('should be redirected to /', async () => {
      await renderPage('/fill-profile');
      
      const nameInput = screen.getByRole('textbox', { name: "Como você se chama?" })
      userEvent.type(nameInput, "Testing User");

      const roleRadio = screen.getByRole('radio', { name: "Aluno" })
      userEvent.click(roleRadio);

      const submit = screen.getByRole('button', { name: "Continuar" })
      userEvent.click(submit);

      const successMessage = await screen.findByRole('alert', { name: "Você será redirecionado em instantes" })
      
      expect(successMessage).toBeInTheDocument();
    })

  })
})