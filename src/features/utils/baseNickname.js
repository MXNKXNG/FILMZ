export const baseNickname = (email = "") => {
  const local = (email.split("@")[0] ?? "").trim();

  let base = local.replace(/[^\p{L}\p{N}_]+/gu, "_").toLocaleLowerCase();

  if (base.length < 2) base = "user";
  if (base.length > 16) base = base.slice(0, 16);

  return base;
};
