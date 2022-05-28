import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted";

export interface CreateWorkoutPlanRepository {
  create(workoutPlan: WorkoutPlanBeingCreated, userId: string): Promise<void>,
}

export interface GetMyWorkoutPlansRepository {
  getByUserId(userId: string): Promise<WorkoutPlanBeingGetted[]>
}