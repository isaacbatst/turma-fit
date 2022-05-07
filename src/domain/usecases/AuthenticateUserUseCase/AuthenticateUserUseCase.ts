import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UserRepository } from "@domain/repositories/UserRepository"
import { Encrypter } from "../../common/Encrypter";

interface AuthenticateUserUseCaseDTO {
  accessToken: string
}

interface AuthenticateUserUseCasePort {
  email: string,
  password: string,
}

export default class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator
  ){}

  async execute(port: AuthenticateUserUseCasePort): Promise<AuthenticateUserUseCaseDTO> {
    const user = await this.userRepository.getByEmail(port.email)

    if(!user) throw new Error('EMAIL_NOT_FOUND');

    const isAuthenticated = await this.encrypter.compare(port.password, user.getPassword());

    if(!isAuthenticated) throw new Error('WRONG_PASSWORD');

    const token = this.tokenGenerator.generate()

    return { accessToken: token }
  }
}