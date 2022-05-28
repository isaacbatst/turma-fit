import WorkoutPlanBeingGetted, { WorkoutPlanType } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";

export interface CreateWorkoutPlanRepository {
  create(workoutPlan: WorkoutPlanBeingGetted, userId: string): Promise<void>,
  getWorkoutPlanTypeById(id: string): Promise<WorkoutPlanType | null>
}

export interface GetMyWorkoutPlansRepository {
  getByUserId(userId: string): Promise<WorkoutPlanBeingGetted[]>
}