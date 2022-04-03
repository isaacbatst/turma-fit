import { AdviceRequest, Prisma } from "@prisma/client";
import { prisma } from '../../lib/prisma';
import { CreateAdviceParams, createAdviceRequest } from "./adviceRequest";

const STUDENT_ADVICE_REQUEST_FROM_ID = 1;
const STUDENT_ADVICE_REQUEST_TO_ID = 2;

const STUDENT_ADVICE_REQUEST_CREATE_DATA: CreateAdviceParams = {
  fromId: STUDENT_ADVICE_REQUEST_FROM_ID,
  toId: STUDENT_ADVICE_REQUEST_TO_ID,
  origin: "STUDENT"
}

jest.mock('../../lib/prisma', () => ({
  prisma: {
    adviceRequest: {
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
  }
}));

const getPrismaCreateDataInput = ({
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

describe('Advice Request Repository', () => {
  describe('Create Personal Advice Request', () => {
    describe('Given a created student request', () => {
      it('should call prisma create advice with expected parameters', async () => {
        await createAdviceRequest(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        
        const dataInput = getPrismaCreateDataInput(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        expect(prisma.adviceRequest.create).toHaveBeenCalledWith({ data: dataInput })
      })

      it('should return same fromId', async () => {
        const request = await createAdviceRequest(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        expect(request.fromUserId).toBe(STUDENT_ADVICE_REQUEST_CREATE_DATA.fromId)
      })

      it('should return same toId', async () => {
        const request = await createAdviceRequest(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        expect(request.toUserId).toBe(STUDENT_ADVICE_REQUEST_CREATE_DATA.toId);
      })

      it('should return same origin', async () => {
        const request = await createAdviceRequest(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        expect(request.origin).toBe(STUDENT_ADVICE_REQUEST_CREATE_DATA.origin);
      })

      it('should return status "PENDING"', async () => {
        const request = await createAdviceRequest(STUDENT_ADVICE_REQUEST_CREATE_DATA);
        expect(request.status).toBe("PENDING");
      })
    })
  })
})