import { prisma } from "../../lib/prisma";

export async function getByEmail(email: string){
  const personal = await prisma.personal.findFirst({
    where: {
      user: {
        email
      }
    }
  })

  return personal
}

export async function getById(id: number) {
  const personal = await prisma.personal.findUnique({
    where: {
      id
    },
  })

  return personal;
}