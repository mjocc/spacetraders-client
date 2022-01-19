import {
  generateApiHandler,
  generateApiUrl,
  triggerServerError,
} from '../../lib/utils';

export default generateApiHandler<{
  method: string;
  path: string;
  body: string;
  token: string;
}>(
  ['method', 'path', 'body', 'token'],
  async (req, res, { method, path, body, token }) => {
    const url = generateApiUrl(path, { token });
    const rawResponse = await fetch(url, {
      method,
      body: method === 'POST' ? body : undefined,
    });
    let results;
    try {
      results = await rawResponse.json();
    } catch (err) {
      triggerServerError(res, 400);
      return;
    }
    res.status(200).json({ results });
  }
);
