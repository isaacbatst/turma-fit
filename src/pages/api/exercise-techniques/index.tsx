import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const exerciseTechniques = await prisma.exerciseTechnique.findMany()

  res.json(exerciseTechniques);
}

export default handler