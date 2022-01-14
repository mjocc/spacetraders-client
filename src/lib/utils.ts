import { NextApiRequest, NextApiResponse } from 'next';
import _every from 'lodash/every';

export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
};

export const handleFormChange =
  (handler: (value: any) => void) => (event: { target: { value: any } }) => {
    handler(event.target.value);
  };

export const makeApiCall = async (apiRoute: string, body: object) =>
  fetch(apiRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const generateApiHandler =
  <HandlerParamsType>(
    bodyParams: string[],
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      bodyParams: HandlerParamsType
    ) => void
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      if (req.body) {
        const bodyParamsPresent = bodyParams.map((param) => param in req.body);
        const paramsAllPresent = _every(bodyParamsPresent);
        if (paramsAllPresent) {
          try {
            handler(req, res, req.body);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 500 });
          }
        } else {
          res.status(400).json({ error: 400 });
        }
      } else {
        res.status(400).json({ error: 400 });
      }
    } else {
      res.status(405).json({ error: 405 });
    }
  };
