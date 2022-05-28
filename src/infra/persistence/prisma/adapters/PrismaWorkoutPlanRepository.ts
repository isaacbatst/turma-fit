import WorkoutPlanBeingGetted from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted';
import { GetMyWorkoutPlansRepository } from '@domain/repositories/WorkoutPlanRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaWorkoutPlanInclude, PrismaGetMyWorkoutPlansMapper } from '../mappers/PrismaGetMyWorkoutPlansMapper';

export class PrismaWorkoutPlanRepository implements GetMyWorkoutPlansRepository {
  constructor(private prisma: PrismaClient){}

  async getByUserId(userId: string): Promise<WorkoutPlanBeingGetted[]> {
    const workoutPlans = await this.prisma.workoutPlan.findMany({
      where: {
        userId
      },
      include: PrismaWorkoutPlanInclude.WORKOUT_PLAN_DETAILS
    });

    return workoutPlans.map(prismaWorkoutPlan => PrismaGetMyWorkoutPlansMapper.ormToDomain(prismaWorkoutPlan));
  }
}