import { prisma } from "../../lib/prisma";

export async function getAdvicesByPersonalUserEmail(email: string){
  const advices = await prisma.advice.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    },
    include: {
      student: {
        include: {
          user: true
        }
      },
      adviceTrainingPlannings:{
        include: {
          trainingPlanning: {
            include: {
              type: true
            }
          }
        }
      }
    }
  })

  return advices;
}
