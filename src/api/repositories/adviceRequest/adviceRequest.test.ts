import { prisma } from '../../../lib/prisma';
import { PrismaAdviceRequestRepository } from "./";
import { prismaAdviceRequestMock, STUDENT_ADVICE_REQUEST_CREATE_MOCK } from "./adviceRequest.mock";
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
        const repository = new PrismaAdviceRequestRepository(prisma);
        await repository.create(STUDENT_ADVICE_REQUEST_CREATE_MOCK);
        
        const dataInput = getPrismaCreateDataInput(STUDENT_ADVICE_REQUEST_CREATE_MOCK);
        expect(prisma.adviceRequest.create).toHaveBeenCalledWith({ data: dataInput })
      })

      it('should return same fromId', async () => {
        const repository = new PrismaAdviceRequestRepository(prisma);
        const request = await repository.create(STUDENT_ADVICE_REQUEST_CREATE_MOCK);
        expect(request.getFromUserId()).toBe(STUDENT_ADVICE_REQUEST_CREATE_MOCK.getFromUserId())
      })

      it('should return same toId', async () => {
        const repository = new PrismaAdviceRequestRepository(prisma);
        const request = await repository.create(STUDENT_ADVICE_REQUEST_CREATE_MOCK);
        expect(request.getToUserId()).toBe(STUDENT_ADVICE_REQUEST_CREATE_MOCK.getToUserId());
      })

      it('should return same origin', async () => {
        const repository = new PrismaAdviceRequestRepository(prisma);
        const request = await repository.create(STUDENT_ADVICE_REQUEST_CREATE_MOCK);
        expect(request.getOrigin()).toBe(STUDENT_ADVICE_REQUEST_CREATE_MOCK.getOrigin());
      })

      it('should return status "PENDING"', async () => {
        const repository = new PrismaAdviceRequestRepository(prisma);
        const request = await repository.create(STUDENT_ADVICE_REQUEST_CREATE_MOCK);

        const INITIAL_STATUS = "PENDING"
        expect(request.getStatus()).toBe(INITIAL_STATUS);
      })
    })
  })
})