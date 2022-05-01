import { Profile } from "@domain/entities/User/Profile";

export interface ProfileRepository {
  create(profile: Profile, userId: string): Promise<void>
  get(id: string): Promise<Profile | null>
}
