import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

export interface GetWorkoutPlanTypesResponse {
  name: string,
  id: string,    
  explanation: string,
  defaultMinRestTime: number
  defaultMaxRestTime: number
}

const handler: NextApiHandler<GetWorkoutPlanTypesResponse[]> = async (req, res) => {
  const workoutPlanTypes = await prisma.workoutPlanType.findMany();

  res.json(workoutPlanTypes);
}

export default handler