import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

export type GetExerciseTechniquesResponse = {
  id: string,
  name: string,
  explanation: string
}[]

const handler: NextApiHandler<GetExerciseTechniquesResponse> = async (req, res) => {
  const exerciseTechniques = await prisma.exerciseTechnique.findMany()

  res.json(exerciseTechniques);
}

export default handler