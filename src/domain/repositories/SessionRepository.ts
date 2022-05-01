import { Session } from "@domain/entities/User/Session";

export interface SessionRepository {
  create(session: Session): Promise<void>
}