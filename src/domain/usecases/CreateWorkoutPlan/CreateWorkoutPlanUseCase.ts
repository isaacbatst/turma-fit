import { UseCase } from "@domain/common/UseCase";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { CreateWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanUseCaseDTO, CreateWorkoutPlanUseCasePort, ICreateWorkoutPlanPortValidator } from "./interfaces";


export class CreateWorkoutPlanService implements UseCase<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCaseDTO> {
  constructor(
    private workoutPlanRepository: CreateWorkoutPlanRepository,
    private uuidGenerator: UuidGenerator,
    private portValidator: ICreateWorkoutPlanPortValidator,
    private sessionRepository: CreateWorkoutPlanSessionRepository
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

    const workoutPlan = new WorkoutPlanBeingCreated({
      planTypeId: validatedPort.planTypeId,
      uuidGenerator: this.uuidGenerator,
      workouts: validatedPort.workouts
    })

    await this.workoutPlanRepository.create(workoutPlan, validatedPort.userId);
  
    return { id: workoutPlan.getId() }
  }
}
