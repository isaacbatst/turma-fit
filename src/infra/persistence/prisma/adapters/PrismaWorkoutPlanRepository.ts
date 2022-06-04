import { WorkoutPlanBeingCreated } from '@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated';
import WorkoutPlanBeingGetted from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted';
import { CreateWorkoutPlanRepository, GetMyWorkoutPlansRepository } from '@domain/repositories/WorkoutPlanRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaCreateWorkoutPlanMapper } from '../mappers/PrismaCreateWorkoutPlanMapper';
import { PrismaWorkoutPlanInclude, PrismaGetMyWorkoutPlansMapper } from '../mappers/PrismaGetMyWorkoutPlansMapper';

export class PrismaWorkoutPlanRepository implements GetMyWorkoutPlansRepository, CreateWorkoutPlanRepository {
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

  async create(workoutPlan: WorkoutPlanBeingCreated, userId: string): Promise<void> {
    const prismaWorkoutPlan = PrismaCreateWorkoutPlanMapper.domainToOrm(workoutPlan, userId);

    await this.prisma.workoutPlan.create({
      data: {
        ...prismaWorkoutPlan,
        workouts: {
          create: workoutPlan.getWorkouts()
        }
      },
    })
  }
}