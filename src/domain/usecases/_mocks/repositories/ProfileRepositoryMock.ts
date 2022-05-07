import { Profile } from "@domain/entities/User/Profile";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";

export class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<void> = jest.fn()
  get: (id: string) => Promise<Profile | null> = async () => null;
}
