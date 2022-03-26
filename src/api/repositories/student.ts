import { prisma } from "../../lib/prisma";

type StudentInclude = {
  trainingPlannings?: boolean,
  user?: boolean
}

export async function getStudentById(studentId: number, include?: StudentInclude) {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId)
    },
    include
  })

  return student
}

export async function getStudentByEmail(studentEmail: string, include?: StudentInclude) {
  const student = await prisma.student.findFirst({
    where: {
      user: {
        email: studentEmail
      }
    },
    include
  })

  return student
}

export async function createStudentConnectedByEmail(email: string){
  const student = await prisma.student.create({
    data: { 
      user: {
        connect: {
          email
        }
      }
    },
  })

  return student;
}