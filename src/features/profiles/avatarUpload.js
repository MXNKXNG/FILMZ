import { updateProfilePath } from "./profilesRepo";

export const avatarUpload = async (supabase, userId, file) => {
  // 파일 경로 정의
  const ext = file.name.split(".").pop().toLowerCase();
  const path = `${userId}/avatar.${ext}`;

  // avatars 버킷에 파일 업로드
  const res = await supabase.storage.from("avatars").upload(path, file, {
    upsert: true,
    contentType: file.type,
    cacheControl: "60",
  });

  if (res.error) {
    return { ok: false, code: "UPLOAD_FAILED", message: res.error.message };
  }

  // 유저 profile_path 업데이트 / 필요한 컬럼만 저장
  const db = await updateProfilePath(userId, path);

  if (!db.ok) {
    return { ok: false, code: db.code, message: db.error?.message };
  }

  return {
    ok: true,
    path: db.data.profile_path,
    updated_at: db.data.updated_at,
  };
};
