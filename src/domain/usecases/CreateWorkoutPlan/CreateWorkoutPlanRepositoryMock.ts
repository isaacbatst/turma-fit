import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { CreateWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";

export class CreateWorkoutPlanRepositoryMock implements CreateWorkoutPlanRepository {
  create = jest.fn(async (workoutPlan: WorkoutPlanBeingCreated, userId: string) => {});
}

export class CreateWorkoutPlanSessionRepositoryMock implements CreateWorkoutPlanSessionRepository {
  public isValid = true;
  
  validate = jest.fn(async (token: string, userId: string): Promise<boolean> => {
    return this.isValid;
  })
}