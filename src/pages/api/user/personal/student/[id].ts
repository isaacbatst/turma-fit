import { NextApiHandler } from 'next'
import { prisma } from '../../../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const { email, id } = req.query

  const user = await prisma.user.findUnique({
    where: {
      email: email.toString()
    },
    include: {
      personal: {
        include: {
          students: {
            include: {
              user: true,
              trainingPlannings: {
                include: {
                  type: true,
                  trainings: {
                    include: {
                      sets: {
                        include: {
                          exercises: {
                            include: {
                              muscleGroups: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
            }
          }
        }
      }
    }
  })

  if(user && user.personal){
    const student = user.personal.students.find(student => student.id === Number(id))

    res.json(student);
  } else {
    res.json({ error: 'personal not found' })
  }

}

export default handler