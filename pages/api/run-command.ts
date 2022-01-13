import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidJson } from '../../lib/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { method, path, body } = req.body;
    let results;
    let status = 200;

    if (
      process.env.TOKEN &&
      method &&
      path &&
      (method === 'GET' || (body && isValidJson(body)))
    ) {
      const url =
        `https://api.spacetraders.io${path}?` +
        new URLSearchParams({ token: process.env.TOKEN });
      const rawResult = await fetch(url, {
        method,
        body: method === 'POST' ? body : undefined,
      });
      status = rawResult.status;
      results = await rawResult.json();
    } else {
      status = 400;
    }

    res
      .status(status)
      .json(
        status === 200
          ? { success: true, results }
          : { success: false, results: null }
      );
  } else {
    res.status(405).json({ success: false, results: null });
  }
}

export default handler;
