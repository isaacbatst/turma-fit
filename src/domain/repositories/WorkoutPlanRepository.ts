import WorkoutPlan from "@domain/entities/WorkoutPlan/WorkoutPlan";

export interface CreateWorkoutPlanRepository {
  create(workoutPlan: WorkoutPlan, userId: string): Promise<void>
}

export interface GetMyWorkoutPlansRepository {
  getByUserId(userId: string): Promise<WorkoutPlan[]>
}