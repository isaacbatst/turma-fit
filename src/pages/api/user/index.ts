import { CreateUserHandlerFactory } from '@application/api/usecases/CreateUser/CreateUserHandlerFactory';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST') {
    const createUserHandler = CreateUserHandlerFactory.make();
    return createUserHandler.handle(req, res);
  }

  return res.status(405).end();
}



export default handler

