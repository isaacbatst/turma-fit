import { Prisma } from "@prisma/client";
import { CreateAdviceParams } from "./";

export const getPrismaCreateDataInput = ({
  fromId, origin, toId
}: CreateAdviceParams): Prisma.AdviceRequestCreateInput => ({
  from: {
    connect: {
      id: fromId,
    }
  },
  to: {
    connect: {
      id: toId
    }
  },
  origin,
  status: 'PENDING'
})
