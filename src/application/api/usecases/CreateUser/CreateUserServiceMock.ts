import { ProfileType } from "@domain/entities/User/Profile";
import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator";
import { CreateUserUseCase, CreateUserUseCaseDTO } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";

export class CreateUserServiceMock implements CreateUserUseCase {
  static readonly TOKEN = 'any_token';
  static readonly ID = 'any_id';

  async execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    return {
      profile: {
        id: CreateUserServiceMock.ID,
        type: port.profile as ProfileType
      },
      user: {
        id: CreateUserServiceMock.ID,
        email: port.email,
        name: port.name
      },
      token: CreateUserServiceMock.TOKEN
    }
  }
}