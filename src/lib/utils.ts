import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Dictionary, every, identity, pickBy } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
  addHistoryItem,
  createHistoryItem,
} from '../store/slices/commandHistory';
import { useToast } from '../store/slices/outcomeToasts';

export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
};

export const handleFormChange =
  <T extends string>(handler: (value: T) => void) =>
  (event: { target: { value: T } }) => {
    handler(event.target.value);
  };
export const handleFormChangeNum =
  (handler: (value: number) => void) =>
  (event: { target: { value: string } }) => {
    handler(parseInt(event.target.value));
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
        const paramsAllPresent = every(bodyParamsPresent);
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

export const generateUrl = (
  path: string,
  params: { [key: string]: string | null | undefined } = {}
): string => {
  const cleanedParams = pickBy(params, identity) as Dictionary<string>;
  return Object.keys(cleanedParams).length > 0
    ? path + '?' + new URLSearchParams(cleanedParams)
    : path;
};

export const generateApiUrl = (
  path: string,
  params?: { [key: string]: string }
): string => {
  return process.env.NEXT_PUBLIC_API_PATH + generateUrl(path, params);
};

export const useViewCommandResults = (showBack?: boolean) => {
  const router = useRouter();
  return (resultsId: string) => {
    const params: { id: string } | { id: string; back: string } = showBack
      ? { id: resultsId, back: 'true' }
      : { id: resultsId };
    const url = '/command/results?' + new URLSearchParams(params);
    router.push(url);
  };
};

interface RunCommandProps {
  method: MethodType;
  path: string;
  body: string;
  setRunning?: Dispatch<SetStateAction<boolean>>;
  callback?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export const useRunCommand = (token: string | null, showBack?: boolean) => {
  const dispatch = useAppDispatch();
  const { openToast } = useToast();
  const viewCommandResults = useViewCommandResults(!!showBack);
  return async ({
    method,
    path,
    body,
    setRunning,
    callback: cb,
    successMessage,
    errorMessage,
  }: RunCommandProps) => {
    setRunning && setRunning(true);
    if (token) {
      const rawResponse = await makeApiCall('/api/run-command', {
        method,
        path,
        body,
        token,
      });
      const response = await rawResponse.json();
      response.results
        ? response.results.error
          ? openToast('error', response.results.error.message)
          : openToast(
              'success',
              successMessage || 'Command successfully executed.'
            )
        : openToast(
            'error',
            errorMessage ||
              "Something went wrong. Command didn't execute. Please try again."
          );
      if (response.results) {
        const { id, historyItem } = createHistoryItem({
          method,
          path,
          body,
          results: response.results,
        });
        dispatch(addHistoryItem(historyItem));
        cb && cb();
        viewCommandResults(id);
      }
      setRunning && setRunning(false);
    } else {
      throw Error('no token provided');
    }
  };
};

type MutationResult<T> =
  | {
      data: T;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };
export const useMutationResult = () => {
  const { openToast } = useToast();
  return async <T>(
    mutationResultFunc: () => Promise<MutationResult<T>>,
    successMessage: string
  ) => {
    const result = await mutationResultFunc();
    if ('error' in result) {
      if ('data' in result.error) {
        openToast(
          'error',
          (result.error.data as { error?: { message?: string } })?.error
            ?.message ?? 'Something went wrong.',
          5000
        );
      } else {
        openToast('error', 'Something went wrong.');
      }
    } else {
      openToast('success', successMessage, 5000);
    }
  };
};

export type MethodType = 'GET' | 'POST' | 'PUT';
