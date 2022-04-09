import { Profile } from "@domain/entities/User/Profile";

export interface ProfileRepository {
  create: (profile: Profile) => Promise<Profile>
  get: (id: string) => Promise<Profile | null>
}
