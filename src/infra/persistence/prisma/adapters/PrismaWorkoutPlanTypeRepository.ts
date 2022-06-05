import { CreateWorkoutPlanTypeRepository } from "@domain/repositories/WorkoutPlanTypeRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaWorkoutPlanTypeRepository implements CreateWorkoutPlanTypeRepository {
  constructor(private prisma: PrismaClient){}

  async existById(id: string): Promise<boolean> {
    const planType = await this.prisma.workoutPlanType.findUnique({
      where: {
        id
      }
    })

    return Boolean(planType);
  }
}