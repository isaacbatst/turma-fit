import { NextApiHandler } from 'next'
import { getPersonalAdvices } from '../../../api/controllers/personal'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'GET'){
    return getPersonalAdvices(req, res)
  }

  res.status(405).end();
}



export default handler