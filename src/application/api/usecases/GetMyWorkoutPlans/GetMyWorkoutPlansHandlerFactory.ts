import { NextApiHandlerAdapter } from "@application/api/adapters/ApiHandler/NextApiHandlerAdapter";
import { GetMyWorkoutPlansUseCase } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase";
import { PrismaSessionRepository } from "@infra/persistence/prisma/adapters/PrismaSessionRepository";
import { PrismaWorkoutPlanRepository } from "@infra/persistence/prisma/adapters/PrismaWorkoutPlanRepository";
import { prisma } from "src/lib/prisma";
import { GetMyWorkoutPlansRequestValidator } from "./GetMyWorkoutPlansRequestValidator";
import { GetMyWorkoutPlansController } from "./GetMyWorkoutPlansController";

export class GetMyWorkoutPlansHandlerFactory {
  static make() {
    const getMyWorkoutPlansRepository = new PrismaWorkoutPlanRepository(prisma);
    const getMyWorkoutPlansSessionRepository = new PrismaSessionRepository(prisma);

    const getMyWorkoutPlansUseCase = new GetMyWorkoutPlansUseCase(
      getMyWorkoutPlansRepository,
      getMyWorkoutPlansSessionRepository
    );

    const getMyWorkoutPlansBodyValidator = new GetMyWorkoutPlansRequestValidator();

    const getMyWorkoutPlansHandler = new GetMyWorkoutPlansController(
      getMyWorkoutPlansUseCase,
      getMyWorkoutPlansBodyValidator
    );

    return new NextApiHandlerAdapter(getMyWorkoutPlansHandler);
  }
}