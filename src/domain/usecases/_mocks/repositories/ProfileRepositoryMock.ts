import { Profile } from "@domain/entities/User/Profile";
import { CreateProfileRepository } from "@domain/repositories/ProfileRepository";

export class CreateProfileRepositoryMock implements CreateProfileRepository {
  create: (profile: Profile) => Promise<void> = jest.fn()
}
