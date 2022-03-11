import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function create(studentEmail: string, personalId: number, include?: Prisma.StudentInclude) {
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
    include,
  })

  return created;
}

export async function getStudentsByPersonalEmail(email: string, include?: Prisma.StudentInclude){
  const students = await prisma.student.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    }, include
  })

  return students
}

export async function getStudentsByIdAndPersonalEmail(id: number, personalEmail: string, include?: Prisma.StudentInclude){
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

export async function getStudentById(studentId: string, include?: Prisma.StudentInclude){
  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId)
    },
  })

  return student
}

export async function getStudentByEmail(studentEmail: string, include?: Prisma.StudentInclude){
  const student = await prisma.student.findFirst({
    where: {
      user: {
        email: studentEmail
      }
    },
  })

  return student
}