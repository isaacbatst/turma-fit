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