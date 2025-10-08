import { useEffect, useState } from "react";
import { getProfile } from "./profilesRepo";

export const useProfile = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      const result = await getProfile(userId);

      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.code ?? "UNKNOWN");
      }
      setLoading(false);
    })();
  }, [userId]);

  return { data, loading, error };
};
