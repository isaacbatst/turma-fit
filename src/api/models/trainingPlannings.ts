import { prisma } from "../../lib/prisma";

export async function getStudentById(studentId: number){
  const trainingPlannings = await prisma.trainingPlanning.findMany({
    where: {
      studentId
    }
  })

  return trainingPlannings;
}