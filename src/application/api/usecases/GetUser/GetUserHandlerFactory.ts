import { NextApiHandlerAdapter } from "@application/api/adapters/ApiHandler/NextApiHandlerAdapter";
import { GetUserUseCase } from "@domain/usecases/GetUser/GetUserUseCase";
import { PrismaUserRepository } from "@infra/persistence/prisma/adapters/PrismaUserRepository";
import { prisma } from "src/lib/prisma";
import { GetUserController } from "./GetUserController";
import { GetUserRequestValidator } from "./GetUserRequestValidator";

export class GetUserHandlerFactory {
  static make(): NextApiHandlerAdapter {
    const userRepository = new PrismaUserRepository(prisma);
    const getUserUseCase = new GetUserUseCase(userRepository);
    const getUserRequestValidator = new GetUserRequestValidator();

    const controller = new GetUserController(
      getUserUseCase,
      getUserRequestValidator
    );

    return new NextApiHandlerAdapter(controller);
  }
}