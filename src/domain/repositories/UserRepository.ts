import { User } from "@domain/entities/User/User";

export interface CreateUserRepository {
  create: (user: User) => Promise<void>,
  getByEmail: (email: string) => Promise<User | null>,
}

export interface AuthenticateUserRepository {
  getByEmail: (email: string) => Promise<User | null>,
}

export interface GetUserRepository {
  getByToken(token: string): Promise<User | null>
}