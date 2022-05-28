import { UseCase } from '@domain/common/UseCase';
import { Workout } from '@domain/entities/WorkoutPlan/WorkoutListBeingGetted';
import WorkoutPlanBeingGetted, { WorkoutPlanType } from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted';
import { AuthorizationError } from '@domain/errors/AuthorizationError';
import { GetMyWorkoutPlanSessionRepository } from '@domain/repositories/SessionRepository';
import { GetMyWorkoutPlansRepository } from '@domain/repositories/WorkoutPlanRepository';

export interface GetMyWorkoutPlansUseCasePort {
  userId: string,
  sessionToken: string,
}

export interface WorkoutPlanDTO {
  id: string,
  planType: WorkoutPlanType,
  workouts: Workout[],
}

export interface GetMyWorkoutPlansUseCaseDTO {
  workoutPlans: WorkoutPlanDTO[]
}

export interface IGetMyWorkoutPlansUseCase extends UseCase<GetMyWorkoutPlansUseCasePort, GetMyWorkoutPlansUseCaseDTO> {}

export class GetMyWorkoutPlansUseCase implements IGetMyWorkoutPlansUseCase {
  constructor(
    private workoutPlansRepository: GetMyWorkoutPlansRepository,
    private sessionRepository: GetMyWorkoutPlanSessionRepository
  ){}
  
  async execute(port: GetMyWorkoutPlansUseCasePort): Promise<GetMyWorkoutPlansUseCaseDTO> {
    const isValid = await this.sessionRepository.validateUserToken(port.userId, port.sessionToken);

    if(!isValid) {
      throw new AuthorizationError('UNAUTHORIZED_SESSION');
    }

    const workoutPlans = await this.workoutPlansRepository.getByUserId(port.userId);

    return {
      workoutPlans: this.mapWorkoutPlansToDTO(workoutPlans)
    }
  }

  private mapWorkoutPlansToDTO(workoutPlans: WorkoutPlanBeingGetted[]): WorkoutPlanDTO[] {
    return workoutPlans.map(workoutPlan => ({
      id: workoutPlan.getId(),
      planType: workoutPlan.getPlanType(),
      workouts: workoutPlan.getWorkouts()
    }))
  }
}
