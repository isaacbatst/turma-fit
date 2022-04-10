import { AdviceRequest } from "@domain/entities/AdviceRequest/AdviceRequest"
import { PersonalProfile, Profile, StudentProfile } from "@domain/entities/User/Profile"
import { AdviceRequestRepository } from "@domain/repositories/AdviceRequestRepository"
import { ProfileRepository } from "@domain/repositories/ProfileRepository"
import { CreateAdviceRequestUseCase } from "./CreateAdviceRequestUseCase"

const NOT_EXISTING_ID = 'not-existing-id';
const STUDENT_PROFILE_ID = 'student-profile-id'
const PERSONAL_PROFILE_ID = 'personal-profile-id'

class ProfileRepositoryMock implements ProfileRepository {
  create: (profile: Profile) => Promise<Profile> = async (profile: Profile) => profile
  get: (id: string) => Promise<Profile | null> = 
    async (id: string) => {
      if(id === STUDENT_PROFILE_ID) return new StudentProfile(id)
      if(id === PERSONAL_PROFILE_ID) return new PersonalProfile(id)
      return null;
    }
}

class AdviceRequestRepositoryMock implements AdviceRequestRepository {
  async create(adviceRequest: AdviceRequest, fromProfile: Profile, toProfile: Profile): Promise<AdviceRequest> {
    return adviceRequest;
  }
}

describe('CreateAdviceRequestUseCase', () => {
  it('should create Advice Request from student to personal with uuid', async() => {
    const profileRepository = new ProfileRepositoryMock();
    const adviceRequestRepository = new AdviceRequestRepositoryMock();

    const createAdviceRequestUseCase = new CreateAdviceRequestUseCase(adviceRequestRepository, profileRepository);
    const created = await createAdviceRequestUseCase.execute({ 
      fromId: STUDENT_PROFILE_ID, 
      toId: PERSONAL_PROFILE_ID, 
    });

    const UUID_LENGTH = 36;
    expect(created.id).toHaveLength(UUID_LENGTH)
  })

  it('should create Advice Request from personal to student with uuid', async() => {
    const profileRepository = new ProfileRepositoryMock();
    const adviceRequestRepository = new AdviceRequestRepositoryMock();

    const createAdviceRequestUseCase = new CreateAdviceRequestUseCase(adviceRequestRepository, profileRepository);
    const created = await createAdviceRequestUseCase.execute({ 
      fromId: PERSONAL_PROFILE_ID, 
      toId: STUDENT_PROFILE_ID, 
    });

    const UUID_LENGTH = 36;
    expect(created.id).toHaveLength(UUID_LENGTH)
  })

  it('should throw on not existing "from profile"', async() => {
    const profileRepository = new ProfileRepositoryMock();
    const adviceRequestRepository = new AdviceRequestRepositoryMock();

    const createAdviceRequestUseCase = new CreateAdviceRequestUseCase(adviceRequestRepository, profileRepository);

    await expect(async () => {
      await createAdviceRequestUseCase.execute({ 
        fromId: NOT_EXISTING_ID, 
        toId: PERSONAL_PROFILE_ID, 
      });
    }).rejects.toThrowError('INVALID_FROM_PROFILE')
  })

  it('should throw on not existing "to profile"', async() => {
    const profileRepository = new ProfileRepositoryMock();
    const adviceRequestRepository = new AdviceRequestRepositoryMock();

    const createAdviceRequestUseCase = new CreateAdviceRequestUseCase(adviceRequestRepository, profileRepository);

    await expect(async () => {
      await createAdviceRequestUseCase.execute({ 
        fromId: STUDENT_PROFILE_ID, 
        toId: NOT_EXISTING_ID, 
      });
    }).rejects.toThrowError('INVALID_TO_PROFILE')
  })
})