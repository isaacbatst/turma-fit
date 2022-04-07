import { AdviceRequest as PrismaAdviceRequest, Prisma } from "@prisma/client";
import { AdviceRequest } from "@domain/adviceRequest/entity/AdviceRequest";

export const STUDENT_ADVICE_REQUEST_FROM_ID = 'student-advice-request-from-id';
export const STUDENT_ADVICE_REQUEST_TO_ID = 'student-advice-request-to-id';

export const STUDENT_ADVICE_REQUEST_CREATE_MOCK: AdviceRequest = new AdviceRequest({
  fromUserId: STUDENT_ADVICE_REQUEST_FROM_ID,
  toUserId: STUDENT_ADVICE_REQUEST_TO_ID,
  origin: "STUDENT"
})

export const prismaAdviceRequestMock = {
  create: jest.fn(
    async (createArgs: Prisma.AdviceRequestCreateArgs):
      Promise<Partial<PrismaAdviceRequest>> => {
      const { data } = createArgs;

      const { origin, status, from, to  } = data;

      return {
        id: 'student-advice-request-id',
        createdAt: new Date(),
        fromUserId: from?.connect?.id,
        toUserId: to?.connect?.id,
        origin,
        status
      }
    })
}