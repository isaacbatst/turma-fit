import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { patchUser } from '../services/user';

export const patchUserHandler: NextApiHandler = async (req, res) => {
  const { name } = req.body;

  const token = await getToken({ req }) as JWT;

  if(!token.email){
    return res.status(401).end();
  }

  if (!name || name.trim().length === 0) {
    return res.status(400).end();
  }

  const { error, data } = await patchUser(token.email, { name });

  if(error) {
    res.status(error.status).json({
      message: error.message
    })
  }

  if(!data){
    res.status(500).end();
  }

  return res.status(200).json(data);
}