import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../context/supabase";
import { QK } from "../utils/queryKeys";
import { avatarUpload } from "./avatarUpload";

export const useAvatarMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      if (!userId) throw new Error("NO_USER");

      const res = await avatarUpload(supabase, userId, file);
      if (!res.ok) throw new Error(res.code || res.message || "UPLOAD_FAILED");

      return { path: res.path, updated_at: res.updated_at };
    },

    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: QK.profile(userId) });
      const prev = queryClient.getQueryData(QK.profile(userId));

      const ext = file.name.split(".").pop().toLowerCase();
      const path = `${userId}/avatar.${ext}`;
      queryClient.setQueryData(QK.profile(userId), (old) => {
        old
          ? { ...old, profile_path: path, updated_at: new Date().toISOString() }
          : old;
      });

      return { prev };
    },

    onError: (_error, _file, context) => {
      if (context?.prev)
        queryClient.setQueryData(QK.profile(userId), context.prev);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QK.profile(userId) });
    },
  });
};
