import WorkoutPlanBeingGetted, { WorkoutPlanType } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";
import { CreateWorkoutPlanDataMock } from "./CreateWorkoutPlanDataMock";

export class CreateWorkoutPlanRepositoryMock implements CreateWorkoutPlanRepository {
  public foundWorkoutPlanType: WorkoutPlanType | null = CreateWorkoutPlanDataMock.WORKOUT_PLAN.getPlanType();

  create = jest.fn(async (workoutPlan: WorkoutPlanBeingGetted, userId: string) => {});
  getWorkoutPlanTypeById = jest.fn(async (id: string) => this.foundWorkoutPlanType)
}
