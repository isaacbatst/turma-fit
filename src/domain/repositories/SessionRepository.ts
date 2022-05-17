import { Session } from "@domain/entities/User/Session";

export interface SessionRepository {
  create(session: Session, userId: string): Promise<void>
}

export interface GetMyWorkoutPlanSessionRepository {
  validateUserToken(userId: string, sessionToken: string): Promise<boolean>
}