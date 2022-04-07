import { AdviceRequest } from "@domain/adviceRequest/entity/AdviceRequest";
import { Prisma } from "@prisma/client";

export const getPrismaAdviceRequestCreateDataInput = (adviceRequest: AdviceRequest): Prisma.AdviceRequestCreateInput => ({
  from: {
    connect: {
      id: adviceRequest.getFromUserId(),
    }
  },
  to: {
    connect: {
      id: adviceRequest.getToUserId()
    }
  },
  origin: adviceRequest.getOrigin(),
  status: 'PENDING'
})
