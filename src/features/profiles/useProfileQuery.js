import { useQuery } from "@tanstack/react-query";
import { QK } from "../utils/queryKeys";
import { fetchProfile } from "./queries";

export const useProfileQuery = (userId) => {
  return useQuery({
    queryKey: QK.profile(userId),
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
