import { NextApiHandler } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { prisma } from '../../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return createStudent(req, res)
  }

  if(req.method === 'GET'){
    return listStudents(req, res)
  }

  res.status(405).end();
}

const createStudent: NextApiHandler = async (req, res) => {
  const { email } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const student = await prisma.student.create({
    data: {  
      user: {
        connect: {
          email
        }
      },
      personal: {
        connectOrCreate: {
          where: {
            userId: user?.id
          },
          create: {
            user: {
              connect: {
                email
              }
            }
          }
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

  res.status(200).json(student)
}

const listStudents: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });

  const { email } = token as JWT;

  const user = await prisma.user.findUnique({
    where: {
      email: (email as string).toString()
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

  res.status(200).json(user?.personal?.students);
}

export default handler