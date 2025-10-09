export const avatarUpload = async (supabase, userId, file) => {
  const ext = file.name.split(".").pop().toLowerCase();
  const path = `${userId}/avatar.${ext}`;

  const res = await supabase.storage.from("avatars").upload(path, file, {
    upsert: true,
    contentType: file.type,
    cacheControl: "60",
  });

  if (res.error) {
    return { ok: false, code: "UPLOAD_FAILED", message: res.error.message };
  }
  const db = await supabase
    .from("profiles")
    .update({ profile_path: path })
    .eq("user_id", userId)
    .select("profile_path, updated_at")
    .single();

  if (db.error) {
    return { ok: false, code: "DB_UPDATE_FAILED", message: db.error.message };
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const v = new Date(db.data.updated_at).getTime();

  return { ok: true, url: `${data.publicUrl}?v=${v}`, path };
};
