import { generateApiHandler, generateApiUrl } from "../../lib/utils";

const verifyCredentials = async (username: string, token: string) => {
  const url = generateApiUrl("/my/account", { token });
  const rawResponse = await fetch(url);
  const results = await rawResponse.json();
  if (results.user) {
    if (username === results.user.username) {
      return true;
    }
  }
  return false;
};

export default generateApiHandler<{ username: string; token: string }>(
  ["username", "token"],
  async (req, res, { username, token }) => {
    const validCredentials = await verifyCredentials(username, token);
    res.status(200).json({ validCredentials });
  }
);
