import { AdviceRequest, AdviceRequestOriginType, AdviceRequestStatusType } from "@domain/entities/AdviceRequest/AdviceRequest";
import { AdviceRequestRepository } from "@domain/repositories/AdviceRequestRepository";
import { ProfileRepository } from "@domain/repositories/ProfileRepository";

export interface CreateAdviceRequestUseCasePort {
  fromId: string,
  toId: string,
}

export interface CreateAdviceRequestDTO {
  id: string,
  createdAt: Date,
  status: AdviceRequestStatusType,
}
export class CreateAdviceRequestUseCase {
  constructor(
    private adviceServiceRepository: AdviceRequestRepository,
    private profileRepository: ProfileRepository
  ) {}
  
  async execute(port: CreateAdviceRequestUseCasePort): Promise<CreateAdviceRequestDTO> {
    const adviceRequest = new AdviceRequest({})

    const fromProfile = await this.profileRepository.get(port.fromId);
    const toProfile = await this.profileRepository.get(port.toId);

    if(!fromProfile) {
      throw new Error('INVALID_FROM_PROFILE')
    }

    if(!toProfile) {
      throw new Error('INVALID_TO_PROFILE')
    }

    const created = await this.adviceServiceRepository.create(adviceRequest, fromProfile, toProfile);

    return {
      id: created.getId(),
      createdAt: created.getCreatedAt(),
      status: created.getStatus(),
    };
  }
}