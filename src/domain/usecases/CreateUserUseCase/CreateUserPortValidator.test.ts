import { CreateUserPortValidator, CreateUserUseCasePort } from "./CreateUserPortValidator"

class PortMock {
  public birthdate = '1990-10-03';
  public email = 'valid@email.com';
  public name = 'Valid Name';
  public password = 'valid-password';
  public profile = 'STUDENT';

  public port: CreateUserUseCasePort = {
    birthdate: this.birthdate,
    email: this.email,
    name: this.name,
    password: this.password,
    profile: this.profile
  }
}

describe('CreateUserPortValidator', () => {
  describe('Given it receives a profile type different from STUDENT and PERSONAL', () => {
    it('should throw "UNKNOWN_PROFILE" error', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();
      portMock.profile = 'INVALID_PROFILE';

      expect(() => {
        validator.validate(portMock)
      }).toThrowError('UNKNOWN_PROFILE')
    })
  })

  describe('Given it receives an invalid email', () => {
    it('should throw "INVALID_EMAIL" error', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();
      portMock.email = "invalid_mail"

      expect(() => {
        validator.validate(portMock)
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives a password with < 8 length', () => {
    it('should throw "INVALID_PASSWORD" error', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();
      portMock.password = 'smal';

      expect(() => {
        validator.validate(portMock)
      }).toThrowError('PASSWORD_LENGTH')
    })
  })

  describe('Given it receives a birthdate different from yyyy-mm-dd', () => {
    it('should throw "INVALID_BIRTHDATE"', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();
      portMock.birthdate = '01/05/1996';

      expect(() => {
        validator.validate(portMock)
      }).toThrowError('INVALID_BIRTHDATE')
    })
  })

  describe('Given it receives a birthdate resulting min age below allowed', () => {
    it('should throw "BELOW_MIN_AGE"', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();
      const now = new Date();
      const notAllowedYear = now.getFullYear() - CreateUserPortValidator.MIN_AGE + 1;

      portMock.birthdate = `${notAllowedYear}-05-02`;

      expect(() => {
        validator.validate(portMock)
      }).toThrowError('BELOW_MIN_AGE')
    })
  })

  describe('Given it receives a valid port', () => {
    it('should not throw', () => {
      const validator = new CreateUserPortValidator();
      const portMock = new PortMock();

      expect(() => {
        validator.validate(portMock)
      }).not.toThrow();
    })
  })
})