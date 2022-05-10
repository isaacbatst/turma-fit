import { prisma } from "src/lib/prisma";
import { CreateUserHandlerFactory } from "./CreateUserHandlerFactory";
import { CreateUserIntegrationTestsDataMock } from "./CreateUserIntegrationTestsDataMock";

const truncateTables = async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        )
      } catch (error) {
        console.log('Error truncating tables:', { error })
      }
    }
  }
}

beforeEach(async () => {
  jest.clearAllMocks();
  await truncateTables();
})

const makeSut = () => {
  const handler = CreateUserHandlerFactory.make();
  const mock = new CreateUserIntegrationTestsDataMock();

  return {
    handler,
    mock
  }
}

describe('CreateUserHandlerFactory', () => {
  describe('Given a valid body', () => {
    it('should return status code 201', async () => {
      const { handler, mock } = makeSut();
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.status).toHaveBeenCalledWith(201);
    })
  })

  describe('Given a repeated email', () => {
    it('should return status code 400', async () => {
      const { handler, mock } = makeSut();
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.status).toHaveBeenCalledWith(201);

      mock.RESPONSE.status.mockClear();

      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.status).toHaveBeenCalledWith(400);
    })
  })

  describe('Given an invalid password', () => {
    it('should return status code 400', async () => {
      const { handler, mock } = makeSut();
      mock.REQUEST.body.password = mock.INVALID_PASSWORD;
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.status).toHaveBeenCalledWith(400);
    })

    it('should return json with error message', async () => {
      const { handler, mock } = makeSut();
      mock.REQUEST.body.password = mock.INVALID_PASSWORD;
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.json).toHaveBeenCalledWith({ error: 'INVALID_PASSWORD' });
    })
  })

  describe('Given an invalid profile', () => {
    it('should return status code 400', async () => {
      const { handler, mock } = makeSut();
      mock.REQUEST.body.profile = mock.INVALID_PROFILE;
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.status).toHaveBeenCalledWith(400);
    })

    it('should return json with error message', async () => {
      const { handler, mock } = makeSut();
      mock.REQUEST.body.profile = mock.INVALID_PROFILE;
      
      await handler.handle(
        mock.REQUEST,
        mock.RESPONSE
      );

      expect(mock.RESPONSE.json).toHaveBeenCalledWith({ error: 'UNKNOWN_PROFILE' });
    })
  })
})