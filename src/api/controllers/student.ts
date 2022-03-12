import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import * as StudentService from '../services/student';

export const createStudent: NextApiHandler = async (req, res) => {
  const { studentEmail } = req.body

  const token = await getToken({ req })
  const { email } = token as JWT;

  if (!email) {
    return res.status(401).end();
  }

  const student = await StudentService.createStudent(email, studentEmail);

  if(!student){
    return res.status(422).end();
  }

  return res.status(201).json(student)
}

export const getPersonalStudents: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });

  const { email } = token as JWT;

  if (!email) {
    return res.status(401).end()
  }

  const students = await StudentService.getPersonalStudents(email);

  return res.status(200).json(students);
}

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