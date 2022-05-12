import { Session } from "@domain/entities/User/Session";
import { GetMyWorkoutPlanSessionRepository, SessionRepository } from "@domain/repositories/SessionRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaSessionRepository implements SessionRepository, GetMyWorkoutPlanSessionRepository {
  constructor(
    private prisma: PrismaClient
  ) {}

  async create(session: Session, userId: string): Promise<void> {
    await this.prisma.session.create({
      data: {
        id: session.getId(),
        token: session.getToken(),
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async validateUserToken(userId: string, sessionToken: string): Promise<boolean> {
    const session = await this.prisma.session.findFirst({
      where: {
        token: sessionToken,
        userId
      }
    })

    return !!session;
  }
}