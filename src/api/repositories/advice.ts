import { prisma } from "../../lib/prisma";

export async function getAdvicesByPersonalUserEmail(email: string){
  const advices = prisma.advice.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    }
  })

  return advices;
}