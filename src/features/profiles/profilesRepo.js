import { supabase } from "../../context/supabase";

export const upsertProfile = async (userId, nickname, email) => {
  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      nickname: nickname,
      email: email,
    },
    { onConflict: "user_id" }
  );

  if (!error) {
    return { ok: true };
  }

  const isUnique =
    error?.code === "23505" || /unique|duplicate/i.test(error?.message ?? "");
  const isRls = /row level security|not authorized|permission/i.test(
    error?.message ?? ""
  );
  return { ok: false, code: isUnique ? "NICKNAME" : isRls ? "RLS" : "UNKNOWN" };
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return { ok: false, error, code: "UNKNOWN" };
  return { ok: true, data };
};

export const updateNickname = async (userId, nickname) => {
  const { error } = await supabase
    .from("profiles")
    .update({ nickname })
    .eq("user_id", userId);

  if (error) {
    const isUnique =
      error?.code === "23505" || /unique|duplicate/i.test(error?.message ?? "");
    const isRls = /row level security|not authorized|permission/i.test(
      error?.message ?? ""
    );
    return {
      ok: false,
      error,
      code: isUnique ? "NICKNAME" : isRls ? "RLS" : "UNKNOWN",
    };
  }

  return { ok: true, data: null };
};

export const updateProfilePath = async (userId, path) => {
  const { error } = await supabase
    .from("profiles")
    .update({ profile_path: path })
    .eq("user_id", userId);

  if (error) return { ok: false, error, code: "UNKNOWN" };
  return { ok: true, data: null };
};
