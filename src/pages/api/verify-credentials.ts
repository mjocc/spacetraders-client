import { generateApiHandler } from '../../lib/utils';

const verifyCredentials = async (username: string, token: string) => {
  let results;
  const rawResponse = await fetch(
    `${process.env.SPACETRADERS_API_BASE_PATH}/my/account?${new URLSearchParams(
      { token }
    )}`
  );
  results = await rawResponse.json();
  if (results.user) {
    if (username == results.user.username) {
      return true;
    }
  }
  return false;
};

export default generateApiHandler<{ username: string; token: string }>(
  ['username', 'token'],
  async (req, res, { username, token }) => {
    const validCredentials = await verifyCredentials(username, token);
    res.status(200).json({ validCredentials });
  }
);
