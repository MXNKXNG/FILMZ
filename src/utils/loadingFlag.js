export const loadFlag = (status, data) => {
  const isLoading = status === "loading" && (data?.length ?? 0) === 0;
  return isLoading;
};
