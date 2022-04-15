import { EncrypterMock, TokenGeneratorMock, UserRepositoryMock } from "../__mocks__";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

describe('AuthenticateUserUseCase', () => {
  describe('Given an not found email is received', () => {
    it('should throw on not found email', async () => {
      const userRepository = new UserRepositoryMock();
      userRepository.foundUser = null;
      const encrypter = new EncrypterMock();
      const tokenGenerator = new TokenGeneratorMock();
      
      const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);
  
      await expect(async () => {
        await authenticateUserUseCase.execute({ email: "not_found@email", password: "any_password" });
      })
        .rejects
        .toThrowError("EMAIL_NOT_FOUND")
    })
  })

  describe('Given a found email is received', () => {
    it('should call encrypter to compare hash and received password', async () => {
      const userRepository = new UserRepositoryMock();
      const encrypter = new EncrypterMock();
      const tokenGenerator = new TokenGeneratorMock();
      
      const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);
  
      await authenticateUserUseCase.execute({ email: "any@email", password: "any_password" });
      
      expect(encrypter.compare).toBeCalledWith("any_password", userRepository.foundUser?.getPassword())
    })
  })

  describe('Given password is not authenticated', () => { 
    it('should throw on not authenticated', async () => {
      const userRepository = new UserRepositoryMock();
      const encrypter = new EncrypterMock();
      encrypter.compareReturn = false;
      const tokenGenerator = new TokenGeneratorMock();

      const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);

      await expect(async () => {
        await authenticateUserUseCase.execute({ email: 'any@email', password: 'wrong_password' });
      })
        .rejects
        .toThrowError('WRONG_PASSWORD');
    })
  })

  describe('Given password is authenticated', () => { 
    it('should call tokenGenerator with id to generate access token', async () => {
      const userRepository = new UserRepositoryMock();
      const encrypter = new EncrypterMock();
      const tokenGenerator = new TokenGeneratorMock();

      const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);  
      await authenticateUserUseCase.execute({ email: 'any@email', password: 'any_password' });

      expect(tokenGenerator.generate).toBeCalled()
    })
    it('should return access token', async () => {
      const userRepository = new UserRepositoryMock();
      const encrypter = new EncrypterMock();
      const tokenGenerator = new TokenGeneratorMock();

      const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);  
      const { accessToken } = await authenticateUserUseCase.execute({ email: 'any@email', password: 'any_password' });

      expect(accessToken).toBeDefined();
    })
  })
})