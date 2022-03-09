import { NextApiHandler } from 'next'
import { createStudent, listStudents } from '../../../../api/controllers/student'

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return createStudent(req, res)
  }

  if(req.method === 'GET'){
    return listStudents(req, res)
  }

  res.status(405).end();
}



export default handler