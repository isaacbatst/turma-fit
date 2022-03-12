import { NextApiHandler } from 'next';
import { patchUserHandler } from '../../../api/controllers/user';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    return patchUserHandler(req, res);
  }

  return res.status(405).end();
}



export default handler

