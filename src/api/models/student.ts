import { prisma } from "../../lib/prisma";

export async function create(studentEmail: string, personalId: number) {
  const created = await prisma.student.create({
    data: {
      user: {
        connect: {
          email: studentEmail
        }
      },
      personal: {
        connect: {
          id: personalId,
        }
      }
    },
    select: {
      user: true,
      trainingPlannings: {
        include: {
          type: true,
        }
      },
    }
  })

  return created;
}

export async function getStudentsByPersonalEmail(email: string){
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      personal: {
        include: {
          students: {
            include: {
              trainingPlannings: {
                include: {
                  type: true,
                }
              },
              user: true
            }
          }
        }
      }
    }
  })

  return user?.personal?.students
}

export async function getStudentById(studentId: string){
  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId)
    },
    include: {
      user: true
    }
  })

  return student
}