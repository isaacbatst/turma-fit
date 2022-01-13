import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const exerciseTechnique = await prisma.exerciseTechnique.findMany()

  res.json(exerciseTechnique);
}

export default handler