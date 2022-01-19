import _every from 'lodash/every';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRouter } from 'next/router';

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

export const triggerServerError = (
  res: NextApiResponse,
  errorCode: number,
  errorMessage?: string
) => {
  res.status(errorCode).json({ error: errorCode, message: errorMessage });
};

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
    const triggerError = (errorCode: number) => {
      triggerServerError(res, errorCode);
    };
    if (req.method === 'POST') {
      if (req.body) {
        const bodyParamsPresent = bodyParams.map((param) => param in req.body);
        const paramsAllPresent = _every(bodyParamsPresent);
        if (paramsAllPresent) {
          try {
            handler(req, res, req.body);
          } catch (err) {
            console.error(err);
            triggerError(500);
          }
        } else {
          triggerError(400);
        }
      } else {
        triggerError(400);
      }
    } else {
      triggerError(405);
    }
  };

export const generateApiUrl = (
  path: string,
  params: { [key: string]: string } = {}
): string => {
  return (
    process.env.NEXT_PUBLIC_API_PATH +
    path +
    '?' +
    new URLSearchParams(params)
  );
};

export const viewCommandResults = (router: NextRouter, resultsId: string) => {
  const url = '/command-results?' + new URLSearchParams({ id: resultsId });
  router.push(url);
};
