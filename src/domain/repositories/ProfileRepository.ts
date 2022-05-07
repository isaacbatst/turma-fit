import { Profile } from "@domain/entities/User/Profile";

export interface CreateProfileRepository {
  create(profile: Profile, userId: string): Promise<void>
}
