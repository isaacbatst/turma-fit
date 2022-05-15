import { UseCase } from "@domain/common/UseCase";
import { User } from "@domain/entities/User/User";
import { GetUserRepository } from "@domain/repositories/UserRepository";

interface GetUserUseCasePort {
  token: string
}

interface GetUserUseCaseDTO {
  user: {
    id: string,
    name: string,
  }
}

export interface IGetUserUseCase extends UseCase<GetUserUseCasePort, GetUserUseCaseDTO> {}

export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    private userRepository: GetUserRepository
  ) {}

  async execute(port: GetUserUseCasePort): Promise<GetUserUseCaseDTO> {
    const user = await this.userRepository.getByToken(port.token)

    if(!user) {
      throw new Error('USER_NOT_FOUND')
    }

    return {
      user: {
        id: user.getId(),
        name: user.getName(),
      }
    }
  }
}
