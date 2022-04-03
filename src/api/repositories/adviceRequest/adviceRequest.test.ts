import { prisma } from '../../../lib/prisma';
import { createAdviceRequest } from "./";
import { prismaAdviceRequestMock, STUDENT_ADVICE_REQUEST_CREATE_DATA } from "./adviceRequest.mock";
import { getPrismaCreateDataInput } from './utils';

jest.mock('../../lib/prisma', () => ({
  prisma: {
    adviceRequest: prismaAdviceRequestMock
  }
}));

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