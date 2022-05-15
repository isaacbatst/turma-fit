import { User } from "@domain/entities/User/User";
import { CreateUserRepository, GetUserRepository } from "@domain/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";


export class PrismaUserRepository implements CreateUserRepository, GetUserRepository {
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

  async getByToken(token: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findFirst({
      where: {
        session: {
          some: {
            token
          }
        }
      }
    })

    if(!prismaUser){
      return null;
    }

    const user = PrismaUserMapper.ormToDomain(prismaUser);

    return user;
  }
}