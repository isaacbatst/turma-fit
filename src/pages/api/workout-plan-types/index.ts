import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const workoutPlanTypes = await prisma.workoutPlanType.findMany();

  res.json(workoutPlanTypes);
}

export default handler