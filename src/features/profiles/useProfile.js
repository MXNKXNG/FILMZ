import { useCallback, useEffect, useState } from "react";
import { getProfile } from "./profilesRepo";

export const useProfile = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await getProfile(userId);

    if (res.ok) {
      setData(res.data);
      setError(null);
    } else {
      setError(res.code ?? "UNKNOWN");
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};
