import { generateApiHandler } from '../../lib/utils';

export default generateApiHandler<{
  method: string;
  path: string;
  body: string;
  token: string;
}>(
  ['method', 'path', 'body', 'token'],
  async (req, res, { method, path, body, token }) => {
    const url =
      `${process.env.SPACETRADERS_API_BASE_PATH}${path}?` +
      new URLSearchParams({ token });
    console.log(url);
    const rawResponse = await fetch(url, {
      method,
      body: method === 'POST' ? body : undefined,
    });
    const results = await rawResponse.json();
    res.status(200).json({ results });
  }
);
