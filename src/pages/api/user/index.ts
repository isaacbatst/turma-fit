import { NextApiHandler } from 'next';
import { patchUserHandler } from '../../../api/controllers/user';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PATCH') {
      return patchUserHandler(req, res);
    }
  
    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(); 
  }
}



export default handler

