export const verifyCredentials = async (username: string, token: string) => {
  const rawResponse = await fetch(
    'https://api.spacetraders.com/my/account?' + new URLSearchParams({ token })
  );
  const results = await rawResponse.json();
  if (results.user) {
    if (username == results.user.username) {
      return true;
    }
  }
  return false;
};
