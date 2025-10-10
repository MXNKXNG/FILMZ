import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK } from "../utils/queryKeys";
import { mutateNickname } from "./queries";

export const useNicknameMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname) => mutateNickname(userId, nickname),

    // 요청 직전 -- 캐시 미리 업데이트
    onMutate: async (nickname) => {
      await queryClient.cancelQueries({ queryKey: QK.profile(userId) });
      const prev = queryClient.getQueryData(QK.profile(userId));
      queryClient.setQueryData(QK.profile(userId), (old) =>
        old ? { ...old, nickname } : old
      );
      return { prev };
    },

    // 요청 실패 -- 이전 상태 복원
    onError: (_error, _variables, context) => {
      if (context?.prev) {
        queryClient.setQueryData(QK.profile(userId), context.prev);
      }
    },

    // 무효화하여 서버 진실과 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QK.profile(userId) });
    },
  });
};
