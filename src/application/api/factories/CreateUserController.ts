import { Encrypter } from "@domain/common/Encrypter";
import { CreateUserService } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { PrismaProfileRepository } from "@infra/persistence/prisma/adapters/PrismaProfileRepository";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { CreateUserBodyValidator } from "../controllers/CreateUserController/CreateUserBodyValidator";
import { CreateUserController } from "../controllers/CreateUserController/CreateUserController";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10; 
class BcryptEncrypter implements Encrypter {
  compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, SALT_ROUNDS);
  }
}

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