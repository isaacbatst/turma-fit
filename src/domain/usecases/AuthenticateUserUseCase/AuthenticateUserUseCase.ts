import { TokenGenerator } from "@domain/common/TokenGenerator";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { Session } from "@domain/entities/User/Session";
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

export default class AuthenticateUserUseCase {
  private userRepository: AuthenticateUserRepository
  private encrypter: Encrypter
  private sessionRepository: SessionRepository
  private tokenGenerator: TokenGenerator
  private uuidGenerator: UuidGenerator

  constructor(
    params: AuthenticateUserUseCaseParams
  ){
    this.userRepository = params.userRepository
    this.encrypter = params.encrypter
    this.tokenGenerator = params.tokenGenerator
    this.sessionRepository = params.sessionRepository
    this.userRepository = params.userRepository
    this.uuidGenerator = params.uuidGenerator
  }

  async execute(port: AuthenticateUserUseCasePort): Promise<AuthenticateUserUseCaseDTO> {
    const user = await this.userRepository.getByEmail(port.email)

    if(!user) throw new Error('EMAIL_NOT_FOUND');

    const isAuthenticated = await this.encrypter.compare(port.password, user.getPassword());

    if(!isAuthenticated) throw new Error('WRONG_PASSWORD');

    const session = new Session(
      this.uuidGenerator.generate(),
      this.tokenGenerator.generate(),
    );

    await this.sessionRepository.create(session);

    return { accessToken: session.getToken() }
  }
}