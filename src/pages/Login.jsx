import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSupabase } from "../context/SupabaseContext";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { signIn, error } = useSupabase();
  const navigate = useNavigate();
  const confirmEmail = /\S+@\S+\.\S+/.test(email);
  const confirmLogin = confirmEmail && pw.length >= 6;

  const signInHandler = async () => {
    if (!confirmLogin) return;
    const result = await signIn(email, pw);
    if (result?.ok) {
      navigate("/main");
    } else {
      console.error(result?.error?.message);
    }
  };

  return (
    <section className="h-dvh flex justify-center items-center text-white animate-fade-in text-base max-[513px]:text-xs min-[1024px]:text-sm min-[2048px]:text-xl">
      <article className="aspect-square h-1/2 flex flex-col justify-center items-center w-120 max-[513px]:w-56 max-[1025px]:w-80">
        {/* 아이디 영역 */}

        <div className="relative top-0.5 w-full">
          <label className=" flex items-center" htmlFor="email">
            <input
              className="cursor-pointer peer text-black text-base min-[2048px]:text-xl bg-white outline-none w-full h-12 min-[1024px]:h-16 min-[2048px]:h-20 border-2 border-[#060B18] focus:z-10 focus:border-[#a04455] rounded-t-2xl px-3 pt-2"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <span className="absolute peer-focus:z-10 text-xs min-[1024px]:text-base min-[2048px]:text-base top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base min-[2048px]:peer-placeholder-shown:text-xl min-[2048px]:peer-placeholder-shown:top-7 min-[1024px]:peer-placeholder-shown:top-6 transition-all duration-200 text-gray-400">
              이메일
            </span>
            <span
              onClick={() => setEmail("")}
              className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
            >
              x
            </span>
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
              minLength={6}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              pattern="^[a-z0-9]+$"
              required
            />
            <span className="absolute focus:z-10 text-xs min-[1024px]:text-base min-[2048px]:text-base top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base min-[2048px]:peer-placeholder-shown:text-xl min-[2048px]:peer-placeholder-shown:top-7 min-[1024px]:peer-placeholder-shown:top-6 transition-all duration-200 text-gray-400">
              비밀번호
            </span>
            <span
              onClick={() => setPw("")}
              className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-400 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
            >
              x
            </span>
          </label>
        </div>
        <button
          onClick={signInHandler}
          className={`cursor-pointer w-full p-4 my-10 rounded-2xl  ${
            confirmLogin ? "bg-[#a04455]" : "bg-gray-500"
          }`}
        >
          로그인
        </button>
        <div className="">
          <Link to={"/signup"}>회원가입</Link>
        </div>
      </article>
    </section>
  );
};
