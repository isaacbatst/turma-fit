import { AdviceRequest } from "@domain/entities/AdviceRequest/AdviceRequest";
import { PrismaClient, AdviceRequest as PrismaAdviceRequest } from "@prisma/client";

class PrismaAdviceRequestMapper {
  public static toORM(domainAdviceRequest: AdviceRequest): PrismaAdviceRequest {
    return {
      createdAt: domainAdviceRequest.getCreatedAt(),
      id: domainAdviceRequest.getId(),
      fromUserId: domainAdviceRequest.getFromUserId(),
      toUserId: domainAdviceRequest.getToUserId(),
      origin: domainAdviceRequest.getOrigin(),
      status: domainAdviceRequest.getStatus()
    }
  }

  public static toDomain(ormAdviceRequest: PrismaAdviceRequest): AdviceRequest {
    const adviceRequest = new AdviceRequest({
      origin: ormAdviceRequest.origin,
      createdAt: ormAdviceRequest.createdAt,
      id: ormAdviceRequest.id,
      status: ormAdviceRequest.status
    })

    return adviceRequest;
  }
}

export class PrismaAdviceRequestRepository implements AdviceRequestRepository {
  constructor(private prisma: PrismaClient){}

  async create(adviceRequest: AdviceRequest): Promise<AdviceRequest> {
    const created = await this.prisma.adviceRequest.create({
      data: {
        origin: adviceRequest.getOrigin(),
        createdAt: adviceRequest.getCreatedAt(),
        status: adviceRequest.getStatus(),
        from: {
          connect: {
            id: adviceRequest.getFromUserId()
          }
        },
        to: {
          connect: {
            id: adviceRequest.getToUserId()
          }
        },
      }
    })

    const domainEntity = PrismaAdviceRequestMapper.toDomain(created);

    return domainEntity;
  }
}