import { NextApiHandler } from 'next'
import { createStudent, getPersonalStudents } from '../../../../api/controllers/student'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return createStudent(req, res)
  }

  if(req.method === 'GET'){
    return getPersonalStudents(req, res)
  }

  res.status(405).end();
}



export default handler