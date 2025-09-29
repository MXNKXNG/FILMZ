import { z } from "zod";

// 회원가입 스키마
export const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("올바른 이메일 형식을 입력하세요."),
    pw: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "영문+숫자를 포함하세요"
      ),
    confirmPw: z.string().min(1, "비밀번호를 한 번 더 입력하세요."),
  })
  .refine((data) => data.pw === data.confirmPw, {
    path: ["confirmPw"],
    message: "비밀번호가 일치하지 않습니다.",
  });
