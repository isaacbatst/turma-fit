import { prisma } from "../../lib/prisma";

export async function getAdvicesByPersonalUserEmail(email: string){
  const advices = await prisma.advice.findMany({
    where: {
      personal: {
        user: {
          email: 'professor@mockdo.com'
        }
      }
    },
    include: {
      student: {
        include: {
          user: true
        }
      },
      trainingPlannings: {
        include: {
          type: true
        }
      }
    }
  })

  return advices;
}
