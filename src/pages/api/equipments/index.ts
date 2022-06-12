import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

export type GetEquipmentsResponse = {
  id: string,
  name: string
}[]

const handler: NextApiHandler<GetEquipmentsResponse> = async (req, res) => {
  const equipment = await prisma.equipment.findMany();

  res.json(equipment);
}

export default handler