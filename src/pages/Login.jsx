import { useRef } from "react";
import { Link } from "react-router";
export const Login = () => {
  const idRef = useRef(null);
  const pwRef = useRef(null);

  return (
    <section className="h-dvh flex justify-center items-center text-white animate-fade-in">
      <article className="aspect-square h-1/2 flex flex-col gap-4 justify-center items-center">
        <form
          action=""
          className="[&:not(:has(:placeholder-shown)):valid_.submit]:bg-[#80404c]"
        >
          {/* 아이디 영역 */}
          <div></div>
          <div className="relative top-0.5">
            <label className=" flex items-center" htmlFor="id">
              <input
                className="cursor-pointer peer text-black bg-white outline-none w-120 max-[513px]:w-56 max-[1025px]:w-80 h-12 border-2 border-#060B18 focus:z-10 focus:border-[#a04455] rounded-t-2xl px-3 pt-2"
                id="id"
                ref={idRef}
                type="text"
                placeholder=" "
                minLength={4}
                maxLength={16}
                pattern="^[a-z0-9]+$"
                required
              />
              <span className="absolute peer-focus:z-10 text-xs top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200 text-gray-400">
                ID
              </span>
              <span
                onClick={() => (idRef.current.value = "")}
                className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-300 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            </label>
          </div>

          {/* 비밀번호 영역 */}
          <div className="relative">
            <label className=" flex items-center gap-3" htmlFor="pw">
              <input
                className="cursor-pointer peer text-black bg-white outline-none border-2 border-#060B18 border-t-1 focus:border-[#a04455] focus:border-t-2 w-120 max-[513px]:w-56 max-[1025px]:w-80 h-12 rounded-b-2xl px-3 pt-2"
                id="pw"
                ref={pwRef}
                type="password"
                placeholder=" "
                minLength={8}
                maxLength={16}
                pattern="^[a-z0-9]+$"
                required
              />
              <span className="absolute focus:z-10 text-xs top-1 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200 text-gray-400">
                PASSWORD
              </span>
              <span
                onClick={() => (pwRef.current.value = "")}
                className="z-10 cursor-pointer absolute peer-placeholder-shown:hidden right-4 bg-gray-300 rounded-full text-xs font-light pb-0.5 w-4 h-4 flex items-center justify-center"
              >
                x
              </span>
            </label>
          </div>
          <button
            className="submit cursor-pointer w-full p-4 my-10 rounded-2xl bg-gray-500"
            type="submit"
          >
            로그인
          </button>
        </form>
        <div className="">
          <Link to={"/signup"}>회원가입</Link>
        </div>
      </article>
    </section>
  );
};
