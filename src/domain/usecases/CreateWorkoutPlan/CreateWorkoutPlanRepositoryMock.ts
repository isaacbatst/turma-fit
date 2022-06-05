import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { CreateWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanTypeRepository } from "@domain/repositories/WorkoutPlanTypeRepository";

export class CreateWorkoutPlanRepositoryMock implements CreateWorkoutPlanRepository {
  create = jest.fn(async (workoutPlan: WorkoutPlanBeingCreated, userId: string) => {});
}

export class CreateWorkoutPlanSessionRepositoryMock implements CreateWorkoutPlanSessionRepository {
  public isValid = true;
  
  validate = jest.fn(async (token: string, userId: string): Promise<boolean> => {
    return this.isValid;
  })
}

export class CreateWorkoutPlanTypeRepositoryMock implements CreateWorkoutPlanTypeRepository {
  public exist = true;

  existById = jest.fn(async (id: string): Promise<boolean> => {
    return this.exist
  })
}