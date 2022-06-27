import { AuthenticateUserHandlerFactory } from "@application/api/usecases/AuthenticateUser/AuthenticateUserHandlerFactory";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if(req.method === 'POST') {
    const authenticateUserHandler = AuthenticateUserHandlerFactory.make();

    return authenticateUserHandler.handle(req, res);
  }
}

export default handler;