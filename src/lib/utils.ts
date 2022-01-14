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
