import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const equipment = await prisma.equipment.findMany();

  res.json(equipment);
}

export default handler