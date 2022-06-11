import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const movements = await prisma.movement.findMany();

  res.json(movements);
}

export default handler