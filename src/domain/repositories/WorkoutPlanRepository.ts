import WorkoutPlan, { WorkoutPlanType } from "@domain/entities/WorkoutPlan/WorkoutPlan";

export interface CreateWorkoutPlanRepository {
  create(workoutPlan: WorkoutPlan, userId: string): Promise<void>,
  getWorkoutPlanTypeById(id: string): Promise<WorkoutPlanType | null>
}

export interface GetMyWorkoutPlansRepository {
  getByUserId(userId: string): Promise<WorkoutPlan[]>
}