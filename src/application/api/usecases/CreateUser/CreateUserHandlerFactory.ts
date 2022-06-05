import { CreateUserService } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { PrismaProfileRepository } from "@infra/persistence/prisma/adapters/PrismaProfileRepository";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { BcryptEncrypterAdapter } from "@application/api/adapters/Encrypter/BcryptEncrypterAdapter";
import { NextApiHandlerAdapter } from "../../adapters/ApiHandler/NextApiHandlerAdapter";
import { PrismaSessionRepository } from "@infra/persistence/prisma/adapters/PrismaSessionRepository";
import { CreateUserPortValidator } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator";
import { CryptoTokenGeneratorAdapter } from "../../adapters/TokenGenerator/CryptoTokenGeneratorAdapter";
import { Uuidv4UuidGeneratorAdapter } from "../../adapters/UuidGenerator/Uuidv4UuidGeneratorAdapter";
import { CreateUserRequestValidator } from "./CreateUserRequestValidator";
import { CreateUserController } from "./CreateUserController";

export class CreateUserHandlerFactory {
  static make() {
    const userRepository = new PrismaUserRepository(prisma);
    const profileRepository = new PrismaProfileRepository(prisma);
    const sessionRepository = new PrismaSessionRepository(prisma);
    const encrypter = new BcryptEncrypterAdapter();
    const portValidator = new CreateUserPortValidator();
    const tokenGenerator = new CryptoTokenGeneratorAdapter();
    const uuidGenerator = new Uuidv4UuidGeneratorAdapter();
  
    const createUserService = new CreateUserService({
      encrypter,
      portValidator,
      userRepository,
      profileRepository,
      sessionRepository,
      tokenGenerator,
      uuidGenerator,
    });
  
    const createUserBodyValidator = new CreateUserRequestValidator();
  
    const createUserController = new CreateUserController(
      createUserBodyValidator,
      createUserService
    )
  
    const createUserHandlerAdapter = new NextApiHandlerAdapter(createUserController);
  
    return createUserHandlerAdapter;
  }
}
