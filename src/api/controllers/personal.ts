import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import * as PersonalService from '../services/personal';

export const createPersonal: NextApiHandler = async (req, res) => {
  const token = await getToken({ req })
  const { email } = token as JWT;

  if (!email) {
    return res.status(401).end();
  }

  const personal = await PersonalService.createPersonal(email);

  if(!personal){
    return res.status(500).end();
  }

  return res.status(201).json(personal)
}
