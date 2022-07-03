import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator";
import { CreateUserRequestValidator } from "./CreateUserRequestValidator";

class RequestMock {
  public request: Record<string, any> = {  
    password: 'any_password',
    birthdate: 'any_birthdate',
    email: 'any_email',
    name: 'any_name',
    profile: 'any_profile'
  }
}

describe('CreateUserBodyValidator', () => {
  describe('Given it receives no password', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      delete requestMock.request.password;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives a password that is not a string', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      requestMock.request.password = false;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives no birthdate', () => {
    it('should throw INVALID_BIRTHDATE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      delete requestMock.request.birthdate;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_BIRTHDATE')
    })
  })

  describe('Given it receives a birthdate that is not a string', () => {
    it('should throw INVALID_BIRTHDATE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      requestMock.request.birthdate = false;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_BIRTHDATE')
    })
  })

  describe('Given it receives no email', () => {
    it('should throw INVALID_EMAIL error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      delete requestMock.request.email;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives a email that is not a string', () => {
    it('should throw INVALID_EMAIL error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      requestMock.request.email = false;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives no name', () => {
    it('should throw INVALID_NAME error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      delete requestMock.request.name;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_NAME')
    })
  })

  describe('Given it receives a name that is not a string', () => {
    it('should throw INVALID_NAME error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      requestMock.request.name = false;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_NAME')
    })
  })


  describe('Given it receives no profile', () => {
    it('should throw INVALID_PROFILE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      delete requestMock.request.profile;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_PROFILE')
    })
  })

  describe('Given it receives a profile that is not a string', () => {
    it('should throw INVALID_PROFILE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();
      requestMock.request.profile = false;
      
      expect(() => {
        createUserBodyValidator.validate(requestMock.request);
      }).toThrowError('INVALID_PROFILE')
    })
  })

  describe('Given it receives valid data', () => {
    it('should return the data', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      const requestMock = new RequestMock();

      const data = createUserBodyValidator.validate(requestMock.request);

      expect(data).toEqual(requestMock.request)
    })
  })
})