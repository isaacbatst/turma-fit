import { MuscleGroup } from '@domain/entities/WorkoutPlan/enums/MuscleGroup'
import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

export type GetMovementsResponse = {
  id: string,
  name: string,
  focusedMuscleGroup: MuscleGroup
}[]

const handler: NextApiHandler<GetMovementsResponse> = async (req, res) => {
  const movements = await prisma.movement.findMany();
  res.json(movements.map(movement => ({
    ...movement,
    focusedMuscleGroup: MuscleGroup[movement.focusedMuscleGroup]
  })));
}

export default handler