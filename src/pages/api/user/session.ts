import { AuthenticateUserHandlerFactory } from "@application/api/usecases/AuthenticateUser/AuthenticateUserHandlerFactory";
import { LogoutUserController } from "@application/api/usecases/LogoutUser/LogoutUserController";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if(req.method === 'POST') {
    const authenticateUserHandler = AuthenticateUserHandlerFactory.make();

    return authenticateUserHandler.handle(req, res);
  }

  if(req.method === 'PATCH') {
    return LogoutUserController.handle(res)
  }

  return res.status(405).end();
}

export default handler;