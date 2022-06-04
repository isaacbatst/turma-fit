import { NextApiHandlerAdapter } from "@application/api/adapters/ApiHandler/NextApiHandlerAdapter";
import { Uuidv4UuidGeneratorAdapter } from "@application/api/adapters/UuidGenerator/Uuidv4UuidGeneratorAdapter";
import { CreateWorkoutPlanPortValidator } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanPortValidator";
import { CreateWorkoutPlanService } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanUseCase";
import { PrismaSessionRepository } from "@infra/persistence/prisma/adapters/PrismaSessionRepository";
import { PrismaWorkoutPlanRepository } from "@infra/persistence/prisma/adapters/PrismaWorkoutPlanRepository";
import { prisma } from "src/lib/prisma";
import { CreateWorkoutPlanController } from "./CreateWorkoutPlanController";
import { CreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator";

export class CreateWorkoutPlanHandlerFactory {
  static make() {
    const requestValidator = new CreateWorkoutPlanRequestValidator();

    const workoutPlanRepository = new PrismaWorkoutPlanRepository(prisma);
    const uuidGenerator = new Uuidv4UuidGeneratorAdapter();
    const portValidator = new CreateWorkoutPlanPortValidator();
    const sessionRepository = new PrismaSessionRepository(prisma);

    const service = new CreateWorkoutPlanService(
      workoutPlanRepository,
      uuidGenerator,
      portValidator,
      sessionRepository
    );

    const controller = new CreateWorkoutPlanController(
      requestValidator,
      service
    );

    const handler = new NextApiHandlerAdapter(controller);

    return handler
  }
}