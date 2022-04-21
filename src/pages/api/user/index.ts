import { makeCreateUserHandler } from '@application/api/factories/CreateUserHandler';
import { NextApiHandler } from 'next';
import { patchUserHandler } from '../../../api/controllers/user';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    return patchUserHandler(req, res);
  }

  if(req.method === 'POST') {
    const createUserHandler = makeCreateUserHandler();

    return createUserHandler.handle(req, res);
  }

  return res.status(405).end();
}



export default handler

