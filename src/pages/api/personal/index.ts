import { NextApiHandler } from 'next'
import { createPersonal } from '../../../api/controllers/personal'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return createPersonal(req, res)
  }

  res.status(405).end();
}



export default handler