import { prisma } from "../../lib/prisma";

export async function getByUserEmail(email: string){
  const user = await prisma.user.findUnique({
    where: {  
      email
    },
    include: {
      personal: true
    }
  })

  return user ? user.personal : null
}

export async function getById(id: number) {
  const personal = await prisma.personal.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  })

  return personal;
}