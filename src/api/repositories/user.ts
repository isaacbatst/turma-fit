import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";


export async function update(user: Partial<User> & { email: string }){
  const updated = await prisma.user.update({
    where: {
      email: user.email
    }, 
    data: user
  })

  return updated;
}

export async function getByEmail(email: string){
  const user = await prisma.user.findUnique({
    where: {
      email
    },
  })

  return user;
}

export async function getByStudentId(id: number){
  const user = await prisma.user.findFirst({
    where: {
      student: {
        id
      }
    },
  })

  return user;
}

export async function getByPersonalId(id: number){
  const user = await prisma.user.findFirst({
    where: {
      personal: {
        id
      }
    },
  })

  return user;
}
