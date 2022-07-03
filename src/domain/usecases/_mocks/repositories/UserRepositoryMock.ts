import { CreateUserEntityParams, User } from "@domain/entities/User/User";
import { CreateUserRepository } from "@domain/repositories/UserRepository";

export class UserRepositoryMock implements CreateUserRepository {
  static readonly USER_DATA: CreateUserEntityParams = {
    id: 'any_id',
    email: 'any_email@email',
    name: 'any_name',
    password: 'any_hashed_password',
    birthdate: new Date(),
  };

  public foundUser: User | null = new User(UserRepositoryMock.USER_DATA)

  create: (user: User) => Promise<void> = 
    jest.fn()
  getByEmail: (email: string) => Promise<User | null> = 
    jest.fn(async (email: string) => this.foundUser)
}