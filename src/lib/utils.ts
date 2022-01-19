import _every from 'lodash/every';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRouter } from 'next/router';
import {
  addHistoryItem,
  createHistoryItem,
} from '../store/slices/commandHistory';
import { getManageToast } from '../store/slices/outcomeToasts';
import { AppDispatch } from '../store/store';

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
    process.env.NEXT_PUBLIC_API_PATH + path + '?' + new URLSearchParams(params)
  );
};

export const viewCommandResults = (router: NextRouter, resultsId: string) => {
  const url = '/command-results?' + new URLSearchParams({ id: resultsId });
  router.push(url);
};

interface RunCommandProps {
  router: NextRouter;
  method: 'GET' | 'POST';
  path: string;
  body: string;
  token: string;
  dispatch: AppDispatch;
  callback?: () => void;
}

export const runCommand = async ({
  router,
  method,
  path,
  body,
  token,
  dispatch,
  callback: cb,
}: RunCommandProps) => {
  const { openToast } = getManageToast(dispatch);

  const rawResponse = await makeApiCall('/api/run-command', {
    method,
    path,
    body,
    token,
  });
  const response = await rawResponse.json();
  openToast(response.results ? 'success' : 'error');
  if (response.results) {
    const { id, historyItem } = createHistoryItem({
      method,
      path,
      body,
      results: response.results,
    });
    dispatch(addHistoryItem(historyItem));
    if (cb) {
      cb();
    }
    viewCommandResults(router, id);
  }
};
