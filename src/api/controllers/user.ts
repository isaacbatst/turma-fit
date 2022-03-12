import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import * as UserService from '../services/user';

export const patchUserHandler: NextApiHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const token = await getToken({ req }) as JWT;

    if (!token.email) {
      return res.status(401).end();
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).end();
    }

    const { error, data } = await UserService.patchUser(token.email, { name });

    if (error || !data) {
      if(error === 'USER_NOT_FOUND'){
        return res.status(404).end();
      }

      return res.status(500).end();
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error)
    res.status(500).end();
  }
}