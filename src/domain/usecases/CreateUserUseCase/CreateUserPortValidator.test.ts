import { CreateUserPortValidator, CreateUserUseCasePort } from "./CreateUserPortValidator"

describe('CreateUserPortValidator', () => {
  describe('Given it receives a profile type different from STUDENT and PERSONAL', () => {
    it('should throw "UNKNOWN_PROFILE" error', () => {
      const PORT_WITH_UNKNOWN_PROFILE: CreateUserUseCasePort = {
        age: 23,
        email: 'valid@email.com',
        image: 'valid-url',
        name: 'Valid Name',
        password: 'valid-password',
        profile: 'INVALID_PROFILE'
      }

      expect(() => {
        CreateUserPortValidator.validate(PORT_WITH_UNKNOWN_PROFILE)
      }).toThrowError('UNKNOWN_PROFILE')
    })
  })

  describe('Given it receives an invalid email', () => {
    it('should throw "INVALID_EMAIL" error', () => {
      const PORT_WITH_INVALID_EMAIL: CreateUserUseCasePort = {
        age: 23,
        email: 'invalid@email',
        image: 'valid-url',
        name: 'Valid Name',
        password: 'valid-password',
        profile: 'STUDENT'
      }

      expect(() => {
        CreateUserPortValidator.validate(PORT_WITH_INVALID_EMAIL)
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives a password with < 8 length', () => {
    it('should throw "INVALID_PASSWORD" error', () => {
      const PORT_WITH_INVALID_PASSWORD: CreateUserUseCasePort = {
        age: 23,
        email: 'valid@email.com',
        image: 'valid-url',
        name: 'Valid Name',
        password: 'smal',
        profile: 'STUDENT'
      }

      expect(() => {
        CreateUserPortValidator.validate(PORT_WITH_INVALID_PASSWORD)
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives a valid port', () => {
    it('should not throw', () => {
      const VALID_PORT: CreateUserUseCasePort = {
        age: 23,
        email: 'valid@email.com',
        image: 'valid-url',
        name: 'Valid Name',
        password: 'valid-password',
        profile: 'STUDENT'
      }

      expect(() => {
        CreateUserPortValidator.validate(VALID_PORT)
      }).not.toThrow();
    })
  })
})