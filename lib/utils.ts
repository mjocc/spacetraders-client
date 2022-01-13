export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
};
