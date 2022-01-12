import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const planningTypes = await prisma.trainingPlanningType.findMany()

  res.json(planningTypes);
}

export default handler