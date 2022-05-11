import { GetMyWorkoutPlansUseCasePort, IGetMyWorkoutPlansUseCase } from "@domain/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansUseCase";

export class GetMyWorkoutPlansServiceMock implements IGetMyWorkoutPlansUseCase {
  static WORKOUT_PLANS = []

  async execute(port: GetMyWorkoutPlansUseCasePort){
    return {
      workoutPlans: GetMyWorkoutPlansServiceMock.WORKOUT_PLANS,
    }
  }
}