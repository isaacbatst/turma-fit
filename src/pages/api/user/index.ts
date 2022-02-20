import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';
import { getByEmail, update } from '../../../models/user';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    return patchUser(req, res);
  }

  return res.status(405).end();
}

const patchUser: NextApiHandler = async (req, res) => {
  const { name } = req.body;
  const token = await getToken({ req });

  if (!token || !token.email) {
    return res.status(401).end();
  }

  if (!name || name.trim().length === 0) {
    return res.status(400).end();
  }

  try {
    const user = await getByEmail(token.email);

    if(!user){
      return res.status(404).end();
    }

    const updated = await update({
      ...user,
      name
    })

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).end();
  }
}

export default handler

