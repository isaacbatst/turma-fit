import { Session } from "@domain/entities/User/Session";
import { EncrypterMock, TokenGeneratorMock, UuidGeneratorMock } from "../_mocks";
import { SessionRepositoryMock } from "../_mocks/repositories/SessionRepositoryMock";
import { UserRepositoryMock } from "../_mocks/repositories/UserRepositoryMock";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

const makeSut = () => {
  const userRepository = new UserRepositoryMock();
  const encrypter = new EncrypterMock();
  const tokenGenerator = new TokenGeneratorMock();
  const sessionRepository = new SessionRepositoryMock();
  const uuidGenerator = new UuidGeneratorMock();
  
  const authenticateUserUseCase = new AuthenticateUserUseCase({
    userRepository,
    encrypter,
    tokenGenerator,
    sessionRepository,
    uuidGenerator
  });

  return {
    authenticateUserUseCase,
    userRepository,
    encrypter,
    tokenGenerator,
    sessionRepository
  }
}

describe('AuthenticateUserUseCase', () => {
  describe('Given an not found email is received', () => {
    it('should throw on not found email', async () => {
      const { authenticateUserUseCase, userRepository } = makeSut();
      userRepository.foundUser = null;
  
      await expect(async () => {
        await authenticateUserUseCase.execute({ email: "not_found@email", password: "any_password" });
      })
        .rejects
        .toThrowError("EMAIL_NOT_FOUND")
    })
  })

  describe('Given a found email is received', () => {
    it('should call encrypter to compare hash and received password', async () => {
      const {authenticateUserUseCase, userRepository, encrypter} = makeSut();
  
      await authenticateUserUseCase.execute({ email: "any@email", password: "any_password" });
      
      expect(encrypter.compare).toBeCalledWith("any_password", userRepository.foundUser?.getPassword())
    })
  })

  describe('Given password is not authenticated', () => { 
    it('should throw on not authenticated', async () => {
      const {authenticateUserUseCase, encrypter } = makeSut();
      encrypter.compareReturn = false;

      await expect(async () => {
        await authenticateUserUseCase.execute({ email: 'any@email', password: 'wrong_password' });
      })
        .rejects
        .toThrowError('WRONG_PASSWORD');
    })
  })

  describe('Given password is authenticated', () => { 
    it('should call tokenGenerator with id to generate access token', async () => {
      const { authenticateUserUseCase, tokenGenerator } = makeSut();

      await authenticateUserUseCase.execute({ email: 'any@email', password: 'any_password' });

      expect(tokenGenerator.generate).toBeCalled()
    })

    it('should call create session with proper params', async () => {
      const { authenticateUserUseCase, sessionRepository } = makeSut();
      
      await authenticateUserUseCase.execute({ email: 'any@email', password: 'any_password' });

      const expectedSession = new Session(
        UuidGeneratorMock.GENERATED_ID,
        TokenGeneratorMock.GENERATED_TOKEN,
      )
      
      expect(sessionRepository.create).toBeCalledWith(expectedSession);
    })

    it('should return access token', async () => {
      const { authenticateUserUseCase } = makeSut();
      
      const { accessToken } = await authenticateUserUseCase.execute({ email: 'any@email', password: 'any_password' });

      expect(accessToken).toBeDefined();
    })
  })
})