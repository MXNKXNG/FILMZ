import { getProfile, updateNickname, updateProfilePath } from "./profilesRepo";

// profile 조회
export const fetchProfile = async (userId) => {
  if (!userId) return null;
  const res = await getProfile(userId);
  if (!res.ok) throw new Error(res.code || "UNKNOWN");
  return res.data;
};

// nickname 업데이트
export const mutateNickname = async (userId, nickname) => {
  const res = await updateNickname(userId, nickname);
  if (!res.ok) throw new Error(res.code || "UNKNOWN");
  return null;
};

// profile_path 업데이트
export const mutateProfilePath = async (userId, path) => {
  const res = await updateProfilePath(userId, path);
  if (!res.ok) throw new Error(res.code || "UNKNOWN");
  return null;
};
