import { AdviceRequest, Prisma } from "@prisma/client";
import { CreateAdviceParams } from "./";

export const STUDENT_ADVICE_REQUEST_FROM_ID = 1;
export const STUDENT_ADVICE_REQUEST_TO_ID = 2;

export const STUDENT_ADVICE_REQUEST_CREATE_DATA: CreateAdviceParams = {
  fromId: STUDENT_ADVICE_REQUEST_FROM_ID,
  toId: STUDENT_ADVICE_REQUEST_TO_ID,
  origin: "STUDENT"
}

export const prismaAdviceRequestMock = {
  create: jest.fn(
    async (createArgs: Prisma.AdviceRequestCreateArgs):
      Promise<Partial<AdviceRequest>> => {
      const { data } = createArgs;

      const { origin, status, from, to  } = data;

      return {
        id: 2,
        createdAt: new Date(),
        fromUserId: from?.connect?.id,
        toUserId: to?.connect?.id,
        origin,
        status
      }
    })
}