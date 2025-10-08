import { z } from "zod";

// 이메일: trim + 이메일 형식
const emailSchema = z.preprocess(
  (v) => (typeof v === "string" ? v.trim() : v),
  z.string().email("올바른 이메일 형식을 입력하세요.")
);

// 패스워드: 8자 이상 영문+숫자
const pwSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,}$/, "영문+숫자를 포함하세요");

// 회원가입 스키마
export const signUpSchema = z
  .object({
    email: emailSchema,
    pw: pwSchema,
    confirmPw: z.string().min(1, "비밀번호를 한 번 더 입력하세요."),
  })
  .refine((data) => data.pw === data.confirmPw, {
    path: ["confirmPw"],
    message: "비밀번호가 일치하지 않습니다.",
  });

// 로그인 스키마
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("올바른 이메일 형식을 입력하세요."),
  pw: z.string().min(1, "비밀번호를 입력하세요."),
});
