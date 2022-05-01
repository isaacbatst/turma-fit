import { User } from "@domain/entities/User/User";

export interface UserRepository {
  create: (user: User) => Promise<void>,
  get: (id: string) => Promise<User | null>,
  getByEmail: (email: string) => Promise<User | null>,
}
