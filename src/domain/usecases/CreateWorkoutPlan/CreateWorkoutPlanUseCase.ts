import { PortValidator } from "@domain/common/PortValidator";
import { UseCase } from "@domain/common/UseCase";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanUseCaseDTO, CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated } from "./interfaces";

export class CreateWorkoutPlanService implements UseCase<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCaseDTO> {
  constructor(
    private workoutRepository: CreateWorkoutPlanRepository,
    private uuidGenerator: UuidGenerator,
    private portValidator: PortValidator<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated>
  ) {}
  
  async execute(port: CreateWorkoutPlanUseCasePort): Promise<CreateWorkoutPlanUseCaseDTO> {
    const validatedPort = this.portValidator.validate(port);
    
    const id = this.uuidGenerator.generate();

    const workoutPlan = new WorkoutPlan({
      id,
      planTypeId: validatedPort.planTypeId,
      workouts: validatedPort.workouts
    })

    await this.workoutRepository.create(workoutPlan, validatedPort.userId);
  
    return { id }
  }
}
