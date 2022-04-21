import { CreateUserService } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { PrismaProfileRepository } from "@infra/persistence/prisma/adapters/PrismaProfileRepository";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { BcryptEncrypter } from "src/utils/BcryptEncrypter";
import { CreateUserBodyValidator } from "../controllers/CreateUserController/CreateUserBodyValidator";
import { CreateUserController } from "../controllers/CreateUserController/CreateUserController";

function makeCreateUserController() {
  const userRepository = new PrismaUserRepository(prisma);
  const profileRepository = new PrismaProfileRepository(prisma);
  const bcryptEncrypter = new BcryptEncrypter();

  const createUserService = new CreateUserService(
    userRepository,
    profileRepository,
    bcryptEncrypter
  );
  const createUserBodyValidator = new CreateUserBodyValidator();

  const createUserController = new CreateUserController(
    createUserBodyValidator,
    createUserService
  )

  return createUserController;
}

export default makeCreateUserController;