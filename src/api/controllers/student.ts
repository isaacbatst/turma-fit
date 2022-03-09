import { NextApiHandler } from "next"
import { getToken, JWT } from "next-auth/jwt"
import * as PersonalModel from "../models/personal"
import * as StudentModel from "../models/student"

export const createStudent: NextApiHandler = async (req, res) => {
  const { studentEmail } = req.body
  const token = await getToken({ req })
  const { email } = token as JWT;

  if (!email) {
    return res.status(401).end()
  }

  const personal = await PersonalModel.getByUserEmail(email);

  if (!personal) {
    return res.status(422).json({ message: 'personal not found' })
  }

  const student = StudentModel.create(studentEmail, personal.id)

  res.status(200).json(student)
}

export const listStudents: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });

  const { email } = token as JWT;

  if (!email) {
    return res.status(401).end()
  }

  const students = await StudentModel.getByPersonalEmail(email)

  if(!students){
    return res.status(422).json({ message: 'personal or user not found' })
  }

  res.status(200).json(students);
}