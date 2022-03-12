import { prisma } from "../../lib/prisma";

type StudentInclude = {
  trainingPlannings?: boolean,
  user?: boolean
}

export async function createStudentConnectedToPersonal(studentEmail: string, personalId: number, include?: StudentInclude) {
  const created = await prisma.student.create({
    data: {
      user: {
        connect: {
          email: studentEmail
        },
      },
      personal: {
        connect: {
          id: personalId
        }
      }
    },
    include
  })

  return created;
}

export async function getStudentsByPersonalEmail(email: string, include?: StudentInclude) {
  const students = await prisma.student.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    },
    include 
  })

  return students
}

export async function getStudentByIdAndPersonalEmail(id: number, personalEmail: string, include?: StudentInclude) {
  const student = await prisma.student.findFirst({
    where: {
      AND: {
        id,
        personal: {
          user: {
            email: personalEmail
          }
        }
      }
    },
    include
  })

  return student;
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