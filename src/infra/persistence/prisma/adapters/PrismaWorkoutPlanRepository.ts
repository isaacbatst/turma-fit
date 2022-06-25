import { ValidationError } from '@application/api/errors/ValidationError';
import { WorkoutPlanBeingCreated } from '@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated';
import WorkoutPlanBeingGetted from '@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted';
import { CreateWorkoutPlanRepository, GetMyWorkoutPlansRepository } from '@domain/repositories/WorkoutPlanRepository';
import { RelationError } from '@infra/persistence/errors/RelationError';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
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
            create: workoutPlan.getWorkouts().map<Prisma.WorkoutCreateInput>(workout => ({
              ...workout,
              sets: {
                create: workout.sets.map<Prisma.SetCreateInput>(set => ({
                  repetitions: set.repetitions,
                  times: set.times,
                  maxRestTime: set.maxRestTime,
                  minRestTime: set.minRestTime,
                  technique: set.techniqueId ? {
                    connect: {
                      id: set.techniqueId
                    }
                  } : undefined,
                  exercises: {
                    create: set.exercises
                  }
                }))
              }
            }))
          }
        },
      })
    } catch(error) {
      if(error instanceof PrismaClientKnownRequestError) {
        console.log(error)
        if(error.code === 'P2025'){
          throw new RelationError('NOT_FOUND_RELATION');
        }

        if(error.code === 'P2003'){
          throw new RelationError('NOT_FOUND_RELATION');
        }
      }

      console.error(error)

      if(error instanceof PrismaClientValidationError) {
        throw new ValidationError('UNKNOWN_BODY_ERROR');
      }
      
      throw new Error();
    }
  }
}