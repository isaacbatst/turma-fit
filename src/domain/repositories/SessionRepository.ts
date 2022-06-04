import { Session } from "@domain/entities/User/Session";

export interface SessionRepository {
  create(session: Session, userId: string): Promise<void>
}

export interface GetMyWorkoutPlanSessionRepository {
  validate(userId: string, sessionToken: string): Promise<boolean>
}

export interface CreateWorkoutPlanSessionRepository {
  validate(token: string, userId: string): Promise<boolean>
}