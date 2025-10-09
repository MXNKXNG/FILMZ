import { baseNickname } from "../utils/baseNickname";
import { upsertProfile } from "./profilesRepo";

// 회원가입 시 이메일 앞부분 기본 닉네임으로 설정
export const autoNickname = async (userId, email) => {
  const base = baseNickname(email ?? "");

  // 중복 시 이메일 + 1, 50회 반복
  for (let i = 0; i < 50; i++) {
    const suffix = i === 0 ? "" : String(i);
    const firstNickname = (base + suffix).slice(0, 20);
    const res = await upsertProfile(userId, firstNickname, email);

    if (res.ok) return { ok: true, nickname: firstNickname };
    if (res.code === "NICKNAME") continue;

    return { ok: false, code: res.code };
  }
  return { ok: false, code: "DONE" };
};
