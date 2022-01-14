import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    include: {
      muscleGroups: true
    }
  })

  res.json(exercises);
}

export default handler