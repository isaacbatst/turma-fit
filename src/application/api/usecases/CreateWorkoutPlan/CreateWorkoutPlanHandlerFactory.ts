import { NextApiHandlerAdapter } from "@application/api/adapters/ApiHandler/NextApiHandlerAdapter";
import { Uuidv4UuidGeneratorAdapter } from "@application/api/adapters/UuidGenerator/Uuidv4UuidGeneratorAdapter";
import { CreateWorkoutPlanPortValidator } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanPortValidator";
import { CreateWorkoutPlanService } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanUseCase";
import { PrismaSessionRepository } from "@infra/persistence/prisma/adapters/PrismaSessionRepository";
import { PrismaWorkoutPlanRepository } from "@infra/persistence/prisma/adapters/PrismaWorkoutPlanRepository";
import { PrismaWorkoutPlanTypeRepository } from "@infra/persistence/prisma/adapters/PrismaWorkoutPlanTypeRepository";
import { prisma } from "src/lib/prisma";
import { CreateWorkoutPlanController, ErrorLogger } from "./CreateWorkoutPlanController";
import { CreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator";

export class CreateWorkoutPlanHandlerFactory {
  static make() {
    const requestValidator = new CreateWorkoutPlanRequestValidator();

    const workoutPlanRepository = new PrismaWorkoutPlanRepository(prisma);
    const uuidGenerator = new Uuidv4UuidGeneratorAdapter();
    const portValidator = new CreateWorkoutPlanPortValidator();
    const sessionRepository = new PrismaSessionRepository(prisma);
    const planTypeRepository = new PrismaWorkoutPlanTypeRepository(prisma);

    const service = new CreateWorkoutPlanService(
      workoutPlanRepository,
      uuidGenerator,
      portValidator,
      sessionRepository,
      planTypeRepository
    );

    const errorLogger: ErrorLogger = {
      log: console.error
    }

    const controller = new CreateWorkoutPlanController(
      requestValidator,
      service,
      errorLogger
    );

    const handler = new NextApiHandlerAdapter(controller);

    return handler
  }
}