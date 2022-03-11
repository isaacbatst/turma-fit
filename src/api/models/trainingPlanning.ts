import { prisma } from "../../lib/prisma";

export async function getByStudentsIds(...studentIds: number[]){
  const trainingPlannings = await prisma.trainingPlanning.findMany({
    where: {
      id: {
        in: studentIds
      }
    }
  })

  return trainingPlannings;
}