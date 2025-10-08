import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpComplete } from "../components/SignUpComplete";
import { useSupabase } from "../context/AuthProvider";
import { signUpSchema } from "../utils/validators";

export const SignUp = () => {
  const { signUp, session } = useSupabase();
  const [success, setSuccess] = useState(false);

  // RHF 세팅
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: { email: "", pw: "", confirmPw: "" },
  });

  // Submit 핸들러 - RHF 유효성 통과한 값만
  const onSubmit = async ({ email, pw }) => {
    setSuccess(false);
    const result = await signUp(email, pw);

    if (result?.ok) {
      setSuccess(true);
      reset();
    } else {
      const raw = result?.error?.message || "회원가입 중 오류가 발생했습니다.";

      // 정규식 검사를 통해 에러 메시지 관리
      if (/already registered/i.test(raw)) {
        setError("email", { message: "이미 가입된 이메일입니다." });
      } else if (/weak password|Invalid password/i.test(raw)) {
        setError("pw", { message: "비밀번호 양식에 맞춰 입력해주세요." });
      } else {
        setError("root", { message: raw });
      }
    }
  };

  // 현재 value 확인
  const emailValue = watch("email");
  const pwValue = watch("pw");
  const confirmPwValue = watch("confirmPw");

  return (
    <section className="h-dvh flex justify-center items-center text-sm min-[2048px]:text-xl text-white animate-fade-in">
      {!success ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="h-1/2 flex flex-col gap-6 justify-center items-center w-120 max-[513px]:w-3/4 max-[1025px]:w-80"
        >
          {/* 아이디 영역 */}
          <div className="relative w-full">
            <label className=" flex-col items-center" htmlFor="email">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                이메일
              </span>
              <input
                className={`cursor-pointer text-base peer text-black bg-white outline-none w-full h-12 min-[2048px]:h-16 border-2 focus:z-10 rounded-2xl px-3 pt-2 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#060B18] focus:border-[#a04455]"
                }`}
                id="email"
                type="email"
                placeholder="이메일 형식으로 입력해주세요."
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {emailValue && (
                <span
                  onClick={() =>
                    reset({ email: "", pw: pwValue, confirmPw: confirmPwValue })
                  }
                  className="z-10 cursor-pointer top-11 min-[2048px]:top-15 absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
                >
                  x
                </span>
              )}
            </label>
            {errors.email && (
              <div className="absolute -bottom-6 min-[2024px]:-bottom-9 right-0 text-red-500 p-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* 비밀번호 영역 */}
          <div className="relative w-full">
            <label className="flex-col items-center" htmlFor="pw">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                비밀번호
              </span>
              <input
                className={`cursor-pointer text-base peer text-black bg-white outline-none border-2 border-t-1 focus:border-2 w-full h-12 min-[2048px]:h-16 rounded-2xl px-3 pt-2 ${
                  errors.pw
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#060B18] focus:border-[#a04455]"
                }`}
                id="pw"
                type="password"
                placeholder="8자 이상의 영문,숫자를 입력해주세요."
                aria-invalid={!!errors.pw}
                {...register("pw")}
              />
              {pwValue && (
                <span
                  onClick={() =>
                    reset({
                      email: emailValue,
                      pw: "",
                      confirmPw: confirmPwValue,
                    })
                  }
                  className="z-10 cursor-pointer absolute top-11 min-[2048px]:top-15 peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
                >
                  x
                </span>
              )}
            </label>
            {errors.pw && (
              <div className="absolute -bottom-6 min-[2024px]:-bottom-9 right-0 text-red-500 p-1">
                {errors.pw.message}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <label className="flex-col items-center" htmlFor="pw2">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                비밀번호 확인
              </span>
              <input
                className={`cursor-pointer text-base peer text-black bg-white outline-none border-2 border-t-1 focus:border-2 w-full h-12 min-[2048px]:h-16 rounded-2xl px-3 pt-2 ${
                  errors.confirmPw
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#060B18] focus:border-[#a04455]"
                }`}
                id="pw2"
                type="password"
                placeholder=" "
                aria-invalid={!!errors.confirmPw}
                {...register("confirmPw")}
              />
              {confirmPwValue && (
                <span
                  onClick={() =>
                    reset({ email: emailValue, pw: pwValue, confirmPw: "" })
                  }
                  className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden top-11 min-[2048px]:top-15 right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
                >
                  x
                </span>
              )}
            </label>
            {errors.confirmPw && (
              <span className="absolute -bottom-6 min-[2024px]:-bottom-9 right-0 text-red-500 p-1">
                {errors.confirmPw.message}
              </span>
            )}
          </div>
          {"root" in errors && errors.root?.message && (
            <div className="w-full flex items-center justify-center text-red-500 p-1">
              {errors.root.message}
            </div>
          )}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`cursor-pointer w-full p-4 my-10 rounded-2xl
          ${
            isValid && !isSubmitting
              ? "bg-[#a04455]"
              : "bg-gray-500 cursor-not-allowed"
          }
          }`}
          >
            {isSubmitting ? "처리중..." : "회원가입"}
          </button>
        </form>
      ) : (
        <SignUpComplete id={session.user?.id} />
      )}
    </section>
  );
};
