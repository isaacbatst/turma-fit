import { UseCase } from '@domain/common/UseCase';
import WorkoutPlan, { Workout } from '@domain/entities/WorkoutPlan/WorkoutPlan';
import { GetMyWorkoutPlansRepository } from './GetMyWorkoutPlansUseCase.test';

export interface GetMyWorkoutPlansUseCasePort {
  userId: string
}

interface WorkoutPlanDTO {
  id: string,
  planTypeId: string,
  workouts: Workout[],
}

interface GetMyWorkoutPlansUseCaseDTO {
  workoutPlans: WorkoutPlanDTO[]
}

export class GetMyWorkoutPlansUseCase implements UseCase<GetMyWorkoutPlansUseCasePort, GetMyWorkoutPlansUseCaseDTO> {
  constructor(
    private workoutPlansRepository: GetMyWorkoutPlansRepository
  ){}
  
  async execute(port: GetMyWorkoutPlansUseCasePort): Promise<GetMyWorkoutPlansUseCaseDTO> {
    const workoutPlans = await this.workoutPlansRepository.getByUserId(port.userId);

    return {
      workoutPlans: this.mapWorkoutPlansToDTO(workoutPlans)
    }
  }

  private mapWorkoutPlansToDTO(workoutPlans: WorkoutPlan[]): WorkoutPlanDTO[] {
    return workoutPlans.map(workoutPlan => ({
      id: workoutPlan.getId(),
      planTypeId: workoutPlan.getPlanTypeId(),
      workouts: workoutPlan.getWorkouts()
    }))
  }
}
