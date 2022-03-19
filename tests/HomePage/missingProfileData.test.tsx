import { screen } from '@testing-library/react';
import * as Cookies from '../mocks/Cookies';
import renderPage from '../renderPage';

describe('Home Page - Missing Profile Data', () => {
  describe('Given User has no name', () => {

    beforeEach(async () => {
      document.cookie = Cookies.getAuthCookie(Cookies.UNAMED_USER);
    })     

    it('should be redirected to /fill-profile', async () => {
      await renderPage('/')

      await screen.findByText('Como você se chama?');
    });

    describe('Given User is not a Personal And User is not a Student', () => {

    })
  })
})
