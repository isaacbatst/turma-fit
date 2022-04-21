import { PersonalProfile, Profile, StudentProfile } from "@domain/entities/User/Profile";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { PrismaClient, Profile as PrismaProfile } from "@prisma/client";

class PrismaProfileMapper {
  static domainToOrm(profile: Profile, userId: string): PrismaProfile {
    const prismaProfile: PrismaProfile = {
      id: profile.getId(),
      type: profile.getType(),
      userId
    }

    return prismaProfile;
  }

  static ormToDomain(prismaProfile: PrismaProfile): Profile {
    if(prismaProfile.type === 'PERSONAL'){
      return new PersonalProfile(prismaProfile.id)
    }

    if(prismaProfile.type === 'STUDENT'){
      return new StudentProfile(prismaProfile.id)
    }

    throw new Error('UNKNOWN_PROFILE_TYPE');
  }
}

export class PrismaProfileRepository implements ProfileRepository {
  constructor(
    private prisma: PrismaClient
  ){}

  async create(profile: Profile, userId: string): Promise<Profile> {
    const prismaProfile = PrismaProfileMapper.domainToOrm(profile, userId);

    const created = await this.prisma.profile.create({
      data: {
        id: prismaProfile.id,
        type: prismaProfile.type,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
    
    if(profile.getType() === 'PERSONAL'){
      await this.prisma.personalProfile.create({
        data: {
          id: prismaProfile.id,
        }
      })
    }

    if(profile.getType() === 'STUDENT') {
      await this.prisma.studentProfile.create({
        data: {
          id: prismaProfile.id,
        }
      })    
    }

    return PrismaProfileMapper.ormToDomain(created);
  }

  async get(id: string): Promise<Profile | null> {
    const prismaProfile = await this.prisma.profile.findUnique({
      where: {
        id
      }
    })

    if(!prismaProfile) {
      return null;
    }

    return PrismaProfileMapper.ormToDomain(prismaProfile);
  }
}