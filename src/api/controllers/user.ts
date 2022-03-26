import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { patchUserErrorCodes, patchUserErrors } from "../errors/user";
import * as UserService from '../services/user';

export const patchUserHandler: NextApiHandler = async (req, res) => {
  try {
    const { name, role } = req.body;

    const token = await getToken({ req }) as JWT;

    if (!token.email) {
      return res.status(401).end();
    }

    const { error, data } = await UserService.patchUser(token.email, { name, role });

    if (error || !data) {
      if (error) {
        return res.status(patchUserErrorCodes[error]).json({ message: error });
      }

      return res.status(500).end();
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error)
    res.status(500).end();
  }
}