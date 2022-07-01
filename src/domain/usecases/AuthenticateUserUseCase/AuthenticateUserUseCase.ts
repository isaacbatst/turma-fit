import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { Session } from "@domain/entities/User/Session";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { SessionRepository } from "@domain/repositories/SessionRepository";
import { AuthenticateUserRepository } from "@domain/repositories/UserRepository"
import { Encrypter } from "../../common/Encrypter";

interface AuthenticateUserUseCaseDTO {
  accessToken: string
}

interface AuthenticateUserUseCasePort {
  email: string,
  password: string,
}

interface AuthenticateUserUseCaseParams {
  userRepository: AuthenticateUserRepository,
  encrypter: Encrypter,
  tokenGenerator: TokenGenerator,
  sessionRepository: SessionRepository
  uuidGenerator: UuidGenerator
}

export interface AuthenticateUserUseCase {
  execute(port: AuthenticateUserUseCasePort): Promise<AuthenticateUserUseCaseDTO>
}

export default class AuthenticateUserService implements AuthenticateUserUseCase {
  private userRepository: AuthenticateUserRepository
  private encrypter: Encrypter
  private sessionRepository: SessionRepository
  private tokenGenerator: TokenGenerator
  private uuidGenerator: UuidGenerator

  constructor(
    params: AuthenticateUserUseCaseParams
  ){
    this.encrypter = params.encrypter
    this.tokenGenerator = params.tokenGenerator
    this.sessionRepository = params.sessionRepository
    this.userRepository = params.userRepository
    this.uuidGenerator = params.uuidGenerator
  }

  async execute(port: AuthenticateUserUseCasePort): Promise<AuthenticateUserUseCaseDTO> {
    const user = await this.userRepository.getByEmail(port.email)

    if(!user) throw new AuthenticationError('EMAIL_NOT_FOUND');

    const isAuthenticated = await this.encrypter.compare(port.password, user.getPassword());

    if(!isAuthenticated) throw new AuthenticationError('WRONG_PASSWORD');

    const session = new Session(
      this.uuidGenerator.generate(),
      this.tokenGenerator.generate(),
    );

    await this.sessionRepository.create(session, user.getId());

    return { accessToken: session.getToken() }
  }
}