import { AdviceRequestRepository } from "@api/repositories/adviceRequest/AdviceRequest";
import { AdviceRequest, AdviceRequestOrigin, AdviceRequestOriginType, AdviceRequestStatusType } from "@domain/adviceRequest/entity/AdviceRequest";

export interface CreateAdviceRequestUseCasePort {
  fromId: string,
  toId: string,
  origin: AdviceRequestOrigin
}

export interface CreateAdviceRequestDTO {
  id: string,
  createdAt: Date,
  status: AdviceRequestStatusType,
  origin: AdviceRequestOriginType,
  fromUserId: string,
  toUserId: string,
}

class CreateAdviceRequestPortValidator {
  public static validate(port: CreateAdviceRequestUseCasePort){
    if(!port.fromId || typeof port.fromId !== 'string'){
      throw new Error('INVALID_FIELD');
    }

    if(!port.toId || typeof port.toId !== 'string'){
      throw new Error('INVALID_FIELD');
    }  

    if(!port.origin || typeof port.origin !== 'string' || (port.origin !== 'STUDENT' && port.origin !== 'PERSONAL')){
      throw new Error('INVALID_FIELD');
    }
  }
}

export interface CreateAdviceRequestUseCase {
  execute(port: CreateAdviceRequestUseCasePort): Promise<CreateAdviceRequestDTO>;
}

export class CreateAdviceRequestService implements CreateAdviceRequestUseCase {
  constructor(
    private adviceServiceRepository: AdviceRequestRepository
  ) {}
  
  async execute(port: CreateAdviceRequestUseCasePort): Promise<CreateAdviceRequestDTO> {
    CreateAdviceRequestPortValidator.validate(port);   
    
    const adviceRequest = new AdviceRequest({
      fromUserId: port.fromId,
      origin: port.origin,
      toUserId: port.toId,
    })

    const created = await this.adviceServiceRepository.create(adviceRequest);

    return {
      id: created.getId(),
      createdAt: created.getCreatedAt(),
      fromUserId: created.getFromUserId(),
      origin: created.getOrigin(),
      status: created.getStatus(),
      toUserId: created.getToUserId()
    };
  }
}