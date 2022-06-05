import { CreateWorkoutPlanHandlerFactory } from '@application/api/usecases/CreateWorkoutPlan/CreateWorkoutPlanHandlerFactory';
import { GetMyWorkoutPlansHandlerFactory } from '@application/api/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansHandlerFactory';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'GET') {
    const handler = GetMyWorkoutPlansHandlerFactory.make();
    return handler.handle(req, res);
  }

  if(req.method === 'POST') {
    const handler = CreateWorkoutPlanHandlerFactory.make();
    return handler.handle(req, res);
  }

  return res.status(405).end();
}



export default handler

