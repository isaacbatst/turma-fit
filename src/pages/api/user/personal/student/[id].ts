import { NextApiHandler } from 'next'
import { getStudent } from '../../../../../api/controllers/student'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'GET'){
    return getStudent(req, res)
  }

  return res.status(405).end();
}

export default handler