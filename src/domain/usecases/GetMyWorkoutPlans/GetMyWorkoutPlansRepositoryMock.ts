import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";
import { GetMyWorkoutPlansRepository } from "@domain/repositories/WorkoutPlanRepository";

export class GetMyWorkoutPlansRepositoryMock implements GetMyWorkoutPlansRepository {
  getByUserId: (userId: string) => Promise<WorkoutPlan[]> = jest.fn(async () => {
    return []
  });
}