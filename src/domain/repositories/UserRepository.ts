import { User } from "@domain/entities/User/User";

export interface UserRepository {
  create: (user: User) => Promise<User>,
  get: (id: string) => Promise<User | null>
}
