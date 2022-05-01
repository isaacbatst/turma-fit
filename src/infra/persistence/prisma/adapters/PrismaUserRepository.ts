import { User } from "@domain/entities/User/User";
import { UserRepository } from "@domain/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";


export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient){} 

  async create(user: User): Promise<void> {
    const prismaUser = PrismaUserMapper.domainToOrm(user);

    await this.prisma.user.create({
      data: prismaUser
    })
  }

  async get(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!prismaUser){
      return null;
    }

    const user = PrismaUserMapper.ormToDomain(prismaUser);

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!prismaUser){
      return null;
    }

    const user = PrismaUserMapper.ormToDomain(prismaUser);

    return user;
  }
}