import { CreateAdviceRequestController } from "@api/controllers/adviceRequest/AdviceRequestController"
import { PrismaAdviceRequestRepository } from "@api/repositories/adviceRequest";
import { CreateAdviceRequestService } from "@api/services/adviceRequest/CreateAdviceRequestService";
import { prisma } from "src/lib/prisma";

export const makeCreateAdviceRequestController: () => CreateAdviceRequestController = () => {
  const prismaRepository = new PrismaAdviceRequestRepository(prisma);
  const useCase = new CreateAdviceRequestService(prismaRepository);
  const controller = new CreateAdviceRequestController(useCase);

  return controller;
}