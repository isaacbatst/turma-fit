import { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.query

  const user = await prisma.user.findUnique({
    where: {
      email: email.toString()
    },
    include: {
      personal: true
    }
  })

  res.json(user)
}

export default handler