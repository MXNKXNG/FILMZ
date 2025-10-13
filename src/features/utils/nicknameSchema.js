import z from "zod";

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .transform((v) => v.trim())
    .refine((v) => v.length >= 2 && v.length <= 20, {
      message: "닉네임은 2~20자여야 합니다.",
    })
    .refine((v) => /^[A-Za-z0-9가-힣_]+$/.test(v), {
      message: "영문/숫자/한글/_만 사용 가능합니다.",
    }),
});
