import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyCredentials } from '../../lib/server/spaceTradersHelpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, token } = req.body;
    console.log(username)
    if (username && token) {
      const validCredentials = await verifyCredentials(username, token);
      res.status(200).json({ validCredentials });
    }
  }
}

export default handler;
