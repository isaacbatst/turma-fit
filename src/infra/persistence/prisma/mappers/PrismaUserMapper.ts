import { User } from "@domain/entities/User/User";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
  static ormToDomain(prismaUser: PrismaUser): User {
    const user = new User({
      birthdate: prismaUser.birthdate,
      email: prismaUser.email,
      image: prismaUser.image || undefined,
      name: prismaUser.name,
      password: prismaUser.password,
      id: prismaUser.id,
      emailVerifiedAt: prismaUser.emailVerifiedAt
    })

    return user;
  }

  static domainToOrm(user: User): PrismaUser {
    const prismaUser: PrismaUser = {
      email: user.getEmail(),
      name: user.getName(),
      image: user.getImage(),
      birthdate: user.getBirthdate(),
      id: user.getId(),
      emailVerifiedAt: user.getEmailVerifiedAt(),
      password: user.getPassword(),
    }

    return prismaUser;
  }
}
