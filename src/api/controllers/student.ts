import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import * as StudentService from '../services/student';

export const getStudent: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const token = await getToken({ req });
    const { email } = token as JWT

    const student = await StudentService.getStudent(email as string, id as string);
  
    if(!student){
      return res.status(404).json({ error: 'student does not exist or is not related to personal]' })
    }

    return res.json(student);
  } catch(err){
    console.error(err);
    res.status(500).end()
  }
}