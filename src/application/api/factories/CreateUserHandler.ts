import { CreateUserService } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { PrismaProfileRepository } from "@infra/persistence/prisma/adapters/PrismaProfileRepository";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { BcryptEncrypterAdapter } from "@application/api/adapters/BcryptEncrypterAdapter";
import { NextApiHandlerAdapter } from "../adapters/NextApiHandlerAdapter";
import { CreateUserBodyValidator } from "../controllers/CreateUserController/CreateUserBodyValidator";
import { CreateUserController } from "../controllers/CreateUserController/CreateUserController";
import { JwtTokenGeneratorAdapter } from "../adapters/JwtTokenGeneratorAdapter";

export function makeCreateUserHandler() {
  const userRepository = new PrismaUserRepository(prisma);
  const profileRepository = new PrismaProfileRepository(prisma);
  const bcryptEncrypter = new BcryptEncrypterAdapter();
  const jwtGenerator = new JwtTokenGeneratorAdapter();

  const createUserService = new CreateUserService(
    userRepository,
    profileRepository,
    bcryptEncrypter,
    jwtGenerator
  );
  const createUserBodyValidator = new CreateUserBodyValidator();

  const createUserController = new CreateUserController(
    createUserBodyValidator,
    createUserService
  )

  const createUserHandleAdapter = new NextApiHandlerAdapter(createUserController);

  return createUserHandleAdapter;
}
