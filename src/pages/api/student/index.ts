import { NextApiHandler } from 'next'
import { createStudent } from '../../../api/controllers/student'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return createStudent(req, res)
  }

  res.status(405).end();
}



export default handler