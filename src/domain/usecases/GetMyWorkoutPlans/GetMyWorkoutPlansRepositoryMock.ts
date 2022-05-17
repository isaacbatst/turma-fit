import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";
import { GetMyWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { GetMyWorkoutPlansRepository } from "@domain/repositories/WorkoutPlanRepository";

export class GetMyWorkoutPlansRepositoryMock implements GetMyWorkoutPlansRepository {
  getByUserId: (userId: string) => Promise<WorkoutPlan[]> = jest.fn(async () => {
    return []
  });
}

export class GetMyWorkoutPlanSessionRepositoryMock implements GetMyWorkoutPlanSessionRepository {
  isValid = true

  validateUserToken = jest.fn(() => {
    return Promise.resolve(this.isValid);
  })
}