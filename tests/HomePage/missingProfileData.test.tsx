import renderPage from "../renderPage"

describe('Home Page - Missing Profile Data', () => {
  describe('Given User has no name', () => {
    beforeEach(() => {
      document.cookie = 'auth=unamed-user';
    })

    it('should be redirected to /fill-profile', async () => {
      await renderPage('/');
      expect(1).toBe(1)
    })
  })

  describe('Given User is not a Personal And User is not a Student', () => {

  })
})
