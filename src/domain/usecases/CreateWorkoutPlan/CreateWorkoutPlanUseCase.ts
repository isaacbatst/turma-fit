import { PortValidator } from "@domain/common/PortValidator";
import { UseCase } from "@domain/common/UseCase";
import { UuidGenerator } from "@domain/common/UuidGenerator";
import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanUseCaseDTO, CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated } from "./interfaces";

export class CreateWorkoutPlanService implements UseCase<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCaseDTO> {
  constructor(
    private repository: CreateWorkoutPlanRepository,
    private uuidGenerator: UuidGenerator,
    private portValidator: PortValidator<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated>,
  ) {}
  
  async execute(port: CreateWorkoutPlanUseCasePort): Promise<CreateWorkoutPlanUseCaseDTO> {
    const validatedPort = this.portValidator.validate(port);
    
    const workoutPlan = new WorkoutPlanBeingCreated({
      planTypeId: validatedPort.planTypeId,
      uuidGenerator: this.uuidGenerator,
      workouts: validatedPort.workouts
    })

    await this.repository.create(workoutPlan, validatedPort.userId);
  
    return { id: workoutPlan.getId() }
  }

}
