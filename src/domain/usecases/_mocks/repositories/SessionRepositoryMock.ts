import { Session } from "@domain/entities/User/Session";
import { SessionRepository } from "@domain/repositories/SessionRepository";

export class SessionRepositoryMock implements SessionRepository {
  async create(session: Session): Promise<void> {}
}
