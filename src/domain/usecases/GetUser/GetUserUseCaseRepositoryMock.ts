import { User } from "@domain/entities/User/User";
import { GetUserRepository } from "@domain/repositories/UserRepository";

export class GetUserRepositoryMock implements GetUserRepository {
  user: User | null = new User({
    id: 'any_id',
    age: 20,
    email: 'any_email',
    image: 'any_image',
    name: 'any_name',
    password: 'any_password',
  });

  getByToken: (token: string) => Promise<User | null> = jest.fn(async () => {
    return this.user;
  })
}
