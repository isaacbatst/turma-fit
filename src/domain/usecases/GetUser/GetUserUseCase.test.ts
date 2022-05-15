import { User } from "@domain/entities/User/User";
import { GetUserRepository } from "@domain/repositories/UserRepository";
import { GetUserUseCase } from "./GetUserUseCase"

class GetUserRepositoryMock implements GetUserRepository {
  user: User | null = new User({
    id: 'any_id',
    age: 20,
    email: 'any_email',
    image: 'any_image',
    name: 'any_name',
    password: 'any_password',
  });

  getByToken: (token: string) => Promise<User | null> = jest.fn(async () => {
    return this.user;
  })
}

const makeSut = () => {
  const userRepository = new GetUserRepositoryMock()
  const getUserUseCase = new GetUserUseCase(userRepository);

  return {
    getUserUseCase,
    userRepository
  };
}

describe('GetUserUseCase', () => {
  it('should be defined', () => {
    expect(GetUserUseCase).toBeDefined()
  })

  it('should have a defined execute method', () => {
    const { getUserUseCase } = makeSut();
    expect(getUserUseCase.execute).toBeDefined()
  })

  it('should call userRepository.getByToken with correct token', async () => {
    const { getUserUseCase, userRepository } = makeSut();
    
    const token = 'token'
    await getUserUseCase.execute({ token })
    
    expect(userRepository.getByToken).toHaveBeenCalledWith(token)
  })

  describe('Given repository does not return a user', () => {
    it('should throw an error', async () => {
      const { getUserUseCase, userRepository } = makeSut();
      userRepository.user = null;
      const token = 'token';

      expect(async () => {
        await getUserUseCase.execute({ token })
      }).rejects.toThrowError('USER_NOT_FOUND')
    })
  })

  describe('Given repository returns a user', () => {
    it('should return user name', async () => {
      const { getUserUseCase, userRepository } = makeSut();
      const token = 'token';

      const dto = await getUserUseCase.execute({ token });
      
      expect(dto.user.name).toBeDefined();
      expect(dto.user.name).toBe(userRepository.user?.getName())
    })
  })
})