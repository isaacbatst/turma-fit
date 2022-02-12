import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const movement = await prisma.movement.findMany({
    include: {
      focusedMuscleGroup: true
    }
  });

  res.json(movement);
}

export default handler