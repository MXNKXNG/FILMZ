import fallback from "../../assets/profile.png";
import { supabase } from "../../context/supabase";

export const useAvatarUrl = (profilePath, version) => {
  const base = profilePath
    ? supabase.storage.from("avatars").getPublicUrl(profilePath).data.publicUrl
    : null;

  const v = version ? new Date(version).getTime() : 0;
  const url = base ? (v ? `${base}?v=${v}` : base) : null;

  return { url: url ?? fallback };
};
