import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator";
import { CreateUserRequestValidator } from "./CreateUserRequestValidator";

describe('CreateUserBodyValidator', () => {
  describe('Given it receives no password', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({});
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives a password that is not a string', () => {
    it('should throw INVALID_PASSWORD error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: false
        });
      }).toThrowError('INVALID_PASSWORD')
    })
  })

  describe('Given it receives no age', () => {
    it('should throw INVALID_AGE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password'
        });
      }).toThrowError('INVALID_AGE')
    })
  })

  describe('Given it receives a age that is not a number', () => {
    it('should throw INVALID_AGE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: '23'
        });
      }).toThrowError('INVALID_AGE')
    })
  })

  describe('Given it receives no email', () => {
    it('should throw INVALID_EMAIL error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23
        });
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives a email that is not a string', () => {
    it('should throw INVALID_EMAIL error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: false
        });
      }).toThrowError('INVALID_EMAIL')
    })
  })

  describe('Given it receives no image', () => {
    it('should throw INVALID_IMAGE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email'
        });
      }).toThrowError('INVALID_IMAGE')
    })
  })

  describe('Given it receives a image that is not a string', () => {
    it('should throw INVALID_IMAGE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email',
          image: false
        });
      }).toThrowError('INVALID_IMAGE')
    })
  })

  describe('Given it receives no name', () => {
    it('should throw INVALID_NAME error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email',
          image: 'any_image'
        });
      }).toThrowError('INVALID_NAME')
    })
  })

  describe('Given it receives a name that is not a string', () => {
    it('should throw INVALID_NAME error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email',
          image: 'any_image',
          name: false
        });
      }).toThrowError('INVALID_NAME')
    })
  })


  describe('Given it receives no profile', () => {
    it('should throw INVALID_PROFILE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email',
          image: 'any_image',
          name: 'any_name'
        });
      }).toThrowError('INVALID_PROFILE')
    })
  })

  describe('Given it receives a profile that is not a string', () => {
    it('should throw INVALID_PROFILE error', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();
      
      expect(() => {
        createUserBodyValidator.validate({
          password: 'any_password',
          age: 23,
          email: 'any_email',
          image: 'any_image',
          name: 'any_name',
          profile: false
        });
      }).toThrowError('INVALID_PROFILE')
    })
  })

  describe('Given it receives valid data', () => {
    it('should return the data', () => {
      const createUserBodyValidator = new CreateUserRequestValidator();

      const MOCK_DATA: CreateUserUseCasePort = {  
        password: 'any_password',
        age: 23,
        email: 'any_email',
        image: 'any_image',
        name: 'any_name',
        profile: 'any_profile'
      }

      const data = createUserBodyValidator.validate(MOCK_DATA);

      expect(data).toEqual(MOCK_DATA)
    })
  })
})