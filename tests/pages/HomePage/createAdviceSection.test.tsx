import { screen } from "@testing-library/react";
import { getAuthCookie, PERSONAL_WITH_ADVICE_COOKIE, STUDENT_WITH_ADVICE_COOKIE } from "../../mocks/cookies";
import renderPage from "../../renderPage";

describe('Home Page - Create Advice Section', () => {
  describe('Given User is a Personal', () => {
    it('should render PersonalAdviceForm', async () => {
      document.cookie = getAuthCookie(PERSONAL_WITH_ADVICE_COOKIE);
      await renderPage('/');

      const form = await screen.findByRole<HTMLFormElement>('form', { name: 'Solicite fazer uma assessoria com um aluno' })
      expect(form).toBeInTheDocument();
    })
  })

  describe('Given User is a Student', () => {
    it('should render StudentAdviceForm', async () => {
      document.cookie = getAuthCookie(STUDENT_WITH_ADVICE_COOKIE);
      await renderPage('/');

      const form = await screen.findByRole<HTMLFormElement>('form', { name: 'Solicite fazer uma assessoria com um personal' })
      expect(form).toBeInTheDocument();
    })
  })
})