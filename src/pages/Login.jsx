import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useSupabase } from "../context/SupabaseContext";
import { signInSchema } from "../utils/validators";
export const Login = () => {
  const { signIn } = useSupabase();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: { email: "", pw: "" },
  });

  const onSubmit = async ({ email, pw }) => {
    const result = await signIn(email, pw);
    if (result?.ok) {
      reset();
      navigate("/main");
    } else {
      const raw = result?.error?.message || "로그인에 실패했습니다.";
      if (/invalid login|invalid credentials|auth/i.test(raw)) {
        setError("root", {
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
      } else if (/rate|too many|attempt/i.test(raw)) {
        setError("root", {
          message: "요청이 많습니다. 잠시 후 다시 시도해주세요.",
        });
      } else {
        setError("root", { message: raw });
      }
    }
  };

  const emailValue = watch("email");
  const pwValue = watch("pw");

  return (
    <section className="h-dvh flex justify-center items-center text-white animate-fade-in text-base max-[513px]:text-xs min-[1024px]:text-sm min-[2048px]:text-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="h-1/2 flex flex-col justify-center items-center w-120 max-[513px]:w-3/4 max-[1025px]:w-80"
      >
        {/* 아이디 영역 */}

        <div className="relative top-0.5 w-full">
          <label className=" flex items-center" htmlFor="email">
            <input
              className="cursor-pointer peer text-black text-base min-[2048px]:text-xl bg-white outline-none w-full h-12 min-[1024px]:h-16 min-[2048px]:h-20 border-2 border-[#060B18] focus:z-10 focus:border-[#a04455] rounded-t-2xl px-3 pt-2"
              id="email"
              type="email"
              placeholder=" "
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            <span className="absolute peer-focus:z-10 text-xs min-[1024px]:text-base min-[2048px]:text-base top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base min-[2048px]:peer-placeholder-shown:text-xl min-[2048px]:peer-placeholder-shown:top-7 min-[1024px]:peer-placeholder-shown:top-6 transition-all duration-200 text-gray-400">
              이메일
            </span>
            {emailValue && (
              <span
                onClick={() => reset({ email: "", pw: pwValue })}
                className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            )}
          </label>
        </div>

        {/* 비밀번호 영역 */}
        <div className="relative w-full">
          <label className=" flex items-center gap-3" htmlFor="pw">
            <input
              className="cursor-pointer peer text-black text-base min-[2048px]:text-xl bg-white outline-none border-2 border-[#060B18] border-t-1 focus:border-[#a04455] focus:border-t-2 w-full h-12 min-[1024px]:h-16 min-[2048px]:h-20 rounded-b-2xl px-3 pt-2"
              id="pw"
              type="password"
              placeholder=" "
              {...register("pw")}
              aria-invalid={!!errors.pw}
            />
            <span className="absolute focus:z-10 text-xs min-[1024px]:text-base min-[2048px]:text-base top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base min-[2048px]:peer-placeholder-shown:text-xl min-[2048px]:peer-placeholder-shown:top-7 min-[1024px]:peer-placeholder-shown:top-6 transition-all duration-200 text-gray-400">
              비밀번호
            </span>
            {pwValue && (
              <span
                onClick={() => reset({ email: emailValue, pw: "" })}
                className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            )}
          </label>
          {errors.email ? (
            <div className="text-red-500 p-1 absolute right-0 text-sm min-[1024px]:text-xs min-[2048px]:text-lg">
              {errors.email.message}
            </div>
          ) : errors.pw ? (
            <div className="text-red-500 p-1 absolute right-0 text-sm min-[1024px]:text-xs min-[2048px]:text-l">
              {errors.pw.message}
            </div>
          ) : (
            "root" in errors && (
              <div className="text-red-500 p-1 absolute right-0 text-sm min-[1024px]:text-xs min-[2048px]:text-l">
                {errors.root?.message}
              </div>
            )
          )}
        </div>
        <button
          type="submit"
          className={`cursor-pointer w-full p-4 my-10 rounded-2xl  ${
            isValid && !isSubmitting ? "bg-[#a04455]" : "bg-gray-500"
          }`}
        >
          {isSubmitting ? "처리중..." : "로그인"}
        </button>
        <div className="">
          <Link to={"/signup"}>회원가입</Link>
        </div>
      </form>
    </section>
  );
};
