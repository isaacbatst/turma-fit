import { NextApiHandlerAdapter } from "@application/api/adapters/ApiHandler/NextApiHandlerAdapter";
import { BcryptEncrypterAdapter } from "@application/api/adapters/Encrypter/BcryptEncrypterAdapter";
import { CryptoTokenGeneratorAdapter } from "@application/api/adapters/TokenGenerator/CryptoTokenGeneratorAdapter";
import { Uuidv4UuidGeneratorAdapter } from "@application/api/adapters/UuidGenerator/Uuidv4UuidGeneratorAdapter";
import AuthenticateUserService from "@domain/usecases/AuthenticateUserUseCase/AuthenticateUserUseCase";
import { PrismaSessionRepository } from "@infra/persistence/prisma/adapters/PrismaSessionRepository";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserRequestValidator } from "./AuthenticateUserRequestValidator";

export class AuthenticateUserHandlerFactory {
  static make() {
    const encrypter = new BcryptEncrypterAdapter();
    const uuidGenerator = new Uuidv4UuidGeneratorAdapter();
    const tokenGenerator = new CryptoTokenGeneratorAdapter();
    const sessionRepository = new PrismaSessionRepository(prisma);
    const userRepository = new PrismaUserRepository(prisma);

    const service = new AuthenticateUserService({
      encrypter,
      uuidGenerator,
      tokenGenerator,
      sessionRepository,
      userRepository
    });
    const requestValidator = new AuthenticateUserRequestValidator();

    const controller = new AuthenticateUserController(service, requestValidator);

    const handler = new NextApiHandlerAdapter(controller);

    return handler;
  }
}