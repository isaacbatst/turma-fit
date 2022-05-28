import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { CreateWorkoutPlanRepository } from "@domain/repositories/WorkoutPlanRepository";

export class CreateWorkoutPlanRepositoryMock implements CreateWorkoutPlanRepository {
  create = jest.fn(async (workoutPlan: WorkoutPlanBeingCreated, userId: string) => {});
}
