import { useState } from "react";
import { SignUpComplete } from "../components/SignUpComplete";
import { useSupabase } from "../context/SupabaseContext";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const { signUp } = useSupabase();
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const confirmEmail = /\S+@\S+\.\S+/.test(email);
  const matchPw = pw === confirmPw;
  const confirmSignUp = confirmEmail && matchPw && pw.length >= 6;

  const signUpHandler = async () => {
    if (!confirmSignUp) return;
    if (confirmSignUp) {
      setSuccess(false);
      const result = await signUp(email, pw);
      if (result?.ok) {
        setUserInfo(result?.user);
        setSuccess(true);
      } else {
        console.error(result?.error?.message);
        setSuccess(false);
      }
    }
  };

  return (
    <section className="h-dvh flex justify-center items-center text-sm min-[2048px]:text-xl text-white animate-fade-in">
      {!success ? (
        <article className="aspect-square h-1/2 flex flex-col gap-4 justify-center items-center w-120 max-[513px]:w-3/4 max-[1025px]:w-80">
          {/* 아이디 영역 */}
          <div className="relative w-full">
            <label className=" flex-col items-center" htmlFor="email">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                이메일
              </span>
              <input
                className="cursor-pointer text-base peer text-black bg-white outline-none w-full h-12 min-[2048px]:h-16 border-2 border-[#060B18] focus:z-10 focus:border-[#a04455] rounded-2xl px-3 pt-2"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 형식으로 입력해주세요."
                required
              />

              <span
                onClick={() => setEmail("")}
                className="z-10 cursor-pointer top-11 min-[2048px]:top-15 absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            </label>
          </div>

          {/* 비밀번호 영역 */}
          <div className="relative w-full">
            <label className="flex-col items-center" htmlFor="pw">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                비밀번호
              </span>
              <input
                className="cursor-pointer text-base peer text-black bg-white outline-none border-2 border-[#060B18] border-t-1 focus:border-[#a04455] focus:border-2 w-full h-12 min-[2048px]:h-16 rounded-2xl px-3 pt-2"
                id="pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="6자 이상의 영문,숫자를 입력해주세요. "
                minLength={6}
                pattern="[a-zA-Z0-9]{6,}"
                required
              />

              <span
                onClick={() => setPw("")}
                className="z-10 cursor-pointer absolute top-11 min-[2048px]:top-15 peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            </label>
          </div>

          <div className="relative w-full">
            <label className="flex-col items-center" htmlFor="pw2">
              <span className="block p-1 text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5">
                비밀번호 확인
              </span>
              <input
                className="cursor-pointer text-base peer text-black bg-white outline-none border-2 border-[#060B18] border-t-1 focus:border-[#a04455] focus:border-2 w-full h-12 min-[2048px]:h-16 rounded-2xl px-3 pt-2"
                id="pw2"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder=" "
                minLength={6}
                pattern="[a-zA-Z0-9]"
                required
              />

              <span
                onClick={() => setConfirmPw("")}
                className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden top-11 min-[2048px]:top-15 right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            </label>
            {pw.length === confirmPw.length && !matchPw && (
              <span className="text-red-500 block p-1">
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={signUpHandler}
            className={`cursor-pointer w-full p-4 my-10 rounded-2xl
          ${confirmSignUp ? "bg-[#a04455]" : "bg-gray-500"}
          }`}
          >
            회원가입
          </button>
        </article>
      ) : (
        <SignUpComplete userInfo={userInfo.email} />
      )}
    </section>
  );
};
