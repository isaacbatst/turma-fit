import { prisma } from "../../lib/prisma";

export async function create(studentEmail: string, personalId: number) {
  const created = await prisma.student.create({
    data: {
      user: {
        connectOrCreate: {
          create: {
            email: studentEmail
          },
          where: {
            email: studentEmail
          }
        }
      },
      personal: {
        connect: {
          id: personalId,
        }
      }
    },
  })

  return created;
}

export async function getStudentsByPersonalEmail(email: string){
  const students = await prisma.student.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    }
  })

  return students
}

export async function getStudentById(studentId: string){
  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId)
    },
  })

  return student
}

export async function getStudentByEmail(studentEmail: string){
  const student = await prisma.student.findFirst({
    where: {
      user: {
        email: studentEmail
      }
    },
  })

  return student
}