import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";

export class CreateWorkoutPlanRepositoryMock implements CreateWorkoutPlanRepository {
  create = jest.fn(async (workoutPlan: WorkoutPlan, userId: string) => {})
}