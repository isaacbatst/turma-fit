import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";
import { GetMyWorkoutPlanSessionRepository } from "@domain/repositories/SessionRepository";
import { GetMyWorkoutPlansRepository } from "@domain/repositories/WorkoutPlanRepository";

export class GetMyWorkoutPlansRepositoryMock implements GetMyWorkoutPlansRepository {
  getByUserId: (userId: string) => Promise<WorkoutPlanBeingGetted[]> = jest.fn(async () => {
    return []
  });
}

export class GetMyWorkoutPlanSessionRepositoryMock implements GetMyWorkoutPlanSessionRepository {
  isValid = true

  validateUserToken = jest.fn(() => {
    return Promise.resolve(this.isValid);
  })
}