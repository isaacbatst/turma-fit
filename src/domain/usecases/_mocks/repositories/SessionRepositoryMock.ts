import { SessionRepository } from "@domain/repositories/SessionRepository";

export class SessionRepositoryMock implements SessionRepository {
  create = jest.fn();
}
