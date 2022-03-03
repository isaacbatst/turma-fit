import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";


export async function update(user: Partial<User>){
  const updated = await prisma.user.update({
    where: {
      email: user.email || ''
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