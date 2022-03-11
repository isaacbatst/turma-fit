import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function createStudentConnectedToPersonal(studentEmail: string, personalId: number) {
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
  })

  return created;
}

export async function getStudentsByPersonalEmailWithUserAndPlannings(email: string) {
  const students = await prisma.student.findMany({
    where: {
      personal: {
        user: {
          email
        }
      }
    },
    include: {
      trainingPlannings: true,
      user: true
    }
  })

  return students
}

export async function getStudentByIdAndPersonalEmailWithUserAndPlannings(id: number, personalEmail: string) {
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
    include: {
      trainingPlannings: true,
      user: true
    }
  })

  return student;
}

export async function getStudentByIdWithUserAndPlannings(studentId: number) {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId)
    },
    include: {
      trainingPlannings: true,
      user: true
    }
  })

  return student
}

export async function getStudentByEmailWithUserAndPlannings(studentEmail: string) {
  const student = await prisma.student.findFirst({
    where: {
      user: {
        email: studentEmail
      }
    },
    include: {
      trainingPlannings: true,
      user: true
    }
  })

  return student
}