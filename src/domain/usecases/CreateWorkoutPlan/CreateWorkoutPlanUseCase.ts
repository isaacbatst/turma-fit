import { UseCase } from "@domain/common/UseCase";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { CreateWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanTypeRepository } from "@domain/repositories/WorkoutPlanTypeRepository";
import { RelationError } from "@infra/persistence/errors/RelationError";
import { CreateWorkoutPlanUseCaseDTO, CreateWorkoutPlanUseCasePort, ICreateWorkoutPlanPortValidator } from "./interfaces";

export interface CreateWorkoutPlanUseCase extends UseCase<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCaseDTO> {}

export class CreateWorkoutPlanService implements CreateWorkoutPlanUseCase {
  constructor(
    private workoutPlanRepository: CreateWorkoutPlanRepository,
    private uuidGenerator: UuidGenerator,
    private portValidator: ICreateWorkoutPlanPortValidator,
    private sessionRepository: CreateWorkoutPlanSessionRepository,
    private planTypeRepository: CreateWorkoutPlanTypeRepository
  ) {}
  
  async execute(port: CreateWorkoutPlanUseCasePort): Promise<CreateWorkoutPlanUseCaseDTO> {
    const validatedPort = this.portValidator.validate(port);
    
    const isTokenValid = await this.sessionRepository.validate(
      validatedPort.token,
      validatedPort.userId
    )    

    if(!isTokenValid){
      throw new AuthorizationError('USER_NOT_AUTHORIZED');
    }

    const planTypeExists = await this.planTypeRepository.existById(validatedPort.planTypeId);

    if(!planTypeExists){
      throw new RelationError('PLAN_TYPE_DOES_NOT_EXIST')
    }

    const workoutPlan = new WorkoutPlanBeingCreated({
      planTypeId: validatedPort.planTypeId,
      uuidGenerator: this.uuidGenerator,
      workouts: validatedPort.workouts
    })

    await this.workoutPlanRepository.create(workoutPlan, validatedPort.userId);
  
    return { id: workoutPlan.getId() }
  }
}
