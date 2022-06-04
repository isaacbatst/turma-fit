import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated";
import { WorkoutPlan } from "@prisma/client";

export class PrismaCreateWorkoutPlanMapper {
  static domainToOrm(workoutPlan: WorkoutPlanBeingCreated, userId: string): WorkoutPlan {
    const prismaWorkoutPlan: WorkoutPlan = {
      id: workoutPlan.getId(),
      userId: userId,
      workoutPlanTypeId: workoutPlan.getPlanTypeId(),
    }

    return prismaWorkoutPlan;
  }
}