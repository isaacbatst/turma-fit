import { WorkoutPlanBeingCreated } from '@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated';
import WorkoutPlanBeingGetted from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted';
import { CreateWorkoutPlanRepository, GetMyWorkoutPlansRepository } from '@domain/repositories/WorkoutPlanRepository';
import { RelationError } from '@infra/persistence/errors/RelationError';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaCreateWorkoutPlanMapper } from '../mappers/PrismaCreateWorkoutPlanMapper';
import { PrismaGetMyWorkoutPlansMapper, PrismaWorkoutPlanInclude } from '../mappers/PrismaGetMyWorkoutPlansMapper';

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
    try {
      const prismaWorkoutPlan = PrismaCreateWorkoutPlanMapper.domainToOrm(workoutPlan, userId);

      await this.prisma.workoutPlan.create({
        data: {
          ...prismaWorkoutPlan,
          workouts: {
            create: workoutPlan.getWorkouts()
          }
        },
      })
    } catch(error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2003') {
          throw new RelationError();
        }
      }

      throw new Error();
    }
  }
}