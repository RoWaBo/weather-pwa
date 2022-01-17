export const formatUnixToDate = (unixTime) => {
  const toMilliseconds = unixTime * 1000;

  const dateObject = new Date(toMilliseconds);

  return dateObject;
};
