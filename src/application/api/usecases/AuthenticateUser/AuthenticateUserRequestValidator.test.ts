import { AuthenticateUserRequestValidator } from "./AuthenticateUserRequestValidator"

const createRequest = (body: Record<string, any>) => {
  return {
    body,
    cookies: {},
    headers: {},
    query: {}
  }
}

describe('AuthenticateUserRequestValidator', () => {
  describe('Given email not received', () => {
    it('should throw INVALID_EMAIL error', () => {
      const validator = new AuthenticateUserRequestValidator();
      const request = createRequest({
        password: 'any_password'
      })

      expect(() => {
        validator.validate(request);
      }).toThrowError('INVALID_EMAIL');
    })
  })

  describe('Given password not received', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const validator = new AuthenticateUserRequestValidator();
      const request = createRequest({
        email: 'any_email'
      })

      expect(() => {
        validator.validate(request);
      }).toThrowError('INVALID_PASSWORD');
    })
  })

  describe('Given valid request', () => {
    it('should return validated data', () => {
      const validator = new AuthenticateUserRequestValidator();
      const request = createRequest({
        email: 'any_email',
        password: 'any_password'
      })

      const validated = validator.validate(request);

      expect(validated).toBeDefined();
    })
  }) 
})