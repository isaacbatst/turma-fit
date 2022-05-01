import { Session } from "@domain/entities/User/Session";
import { SessionRepository } from "@domain/repositories/SessionRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaSessionRepository implements SessionRepository {
  constructor(
    private prisma: PrismaClient
  ) {}

  async create(session: Session): Promise<void> {
    await this.prisma.session.create({
      data: {
        id: session.getId(),
        token: session.getToken(),
      }
    })
  }
}