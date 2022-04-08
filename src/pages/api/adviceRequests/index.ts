import { makeCreateAdviceRequestController } from "@api/factories/CreateAdviceRequestFactory";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const controller = makeCreateAdviceRequestController();
    const { code, body } = await controller.handle(req.body);
    return res.status(code).json(body);
  }

  return res.status(405).end();
}

export default handler;