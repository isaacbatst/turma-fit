import { CookiesNames } from "@application/api/common/CookiesNames"
import { GetUserRequestValidator } from "./GetUserRequestValidator"

describe('GetUserRequestValidator', () => {
  it('should be defined', () => {
    expect(GetUserRequestValidator).toBeDefined()
  })
  
  describe('Given a request without token', () => {
    it('should throw an error', async () => {
      const validator = new GetUserRequestValidator();

      const request = {
        cookies: {}
      }

      expect(() => {
        validator.validate(request)
      }).toThrowError('TOKEN_NOT_FOUND')
    })
  })

  describe('Given a request with token', () => {
    it('should return a valid request', async () => {
      const validator = new GetUserRequestValidator();

      const request = {
        cookies: {
          [CookiesNames.AUTHORIZATION]: 'any_token'
        }
      }

      const result = validator.validate(request)

      expect(result).toBeDefined()
      expect(result.cookies).toBeDefined()
      expect(result.cookies).toHaveProperty(CookiesNames.AUTHORIZATION)
      expect(result.cookies[CookiesNames.AUTHORIZATION]).toBe('any_token')
    })
  })
})