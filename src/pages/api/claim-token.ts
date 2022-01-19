import {
  generateApiHandler,
  generateApiUrl,
  triggerServerError,
} from '../../lib/utils';

export default generateApiHandler<{ username: string }>(
  ['username'],
  async (req, res, { username }) => {
    const url = generateApiUrl(`/users/${username}/claim`);
    const rawResponse = await fetch(url, { method: 'POST' });
    const results = await rawResponse.json();
    if (rawResponse.status === 409) {
      triggerServerError(res, 409, 'Username has already been claimed.');
    } else {
      res.status(200).json(results);
    }
  }
);
