import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'PATCH'){
    return patchUser(req, res);
  }

  return res.status(405).end();
}

const patchUser: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if(!session) {
    return res.status(401).end()
  }

  const { name } = req.body;

  if(!name || name.trim().length === 0){
    return res.status(400).end();
  }

  try {
    await prisma.user.update({
      where: {
        email: session.user.email
      }, 
      data: {
        name
      }
    })

    return res.status(200).end();
  } catch(err) {
    return res.status(500).end();
  }
}

export default handler

