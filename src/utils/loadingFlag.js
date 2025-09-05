export const loadFlag = (status, results) => {
  const isLoading = status === "loading" && (results?.length ?? 0) === 0;
  return isLoading;
};
