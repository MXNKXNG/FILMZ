import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
import github from "../assets/GitHub.png";
import logo from "../assets/logo2.png";
import profile from "../assets/profile.png";
import { useSupabase } from "../context/SupabaseContext";
import { ModalLayout } from "./ModalLayout";
import { SearchModal } from "./SearchModal";

export const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const { session, lastAuthEvent, signOut, clearLastAuthEvent } = useSupabase();
  const [successLogIn, setSuccessLogIn] = useState(false);
  const [successLogOut, setSuccessLogOut] = useState(false);

  // 검색 박스 포커스
  useEffect(() => {
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  // 모달 핸들러
  const modalHandle = () => {
    setShowModal((prev) => !prev);
    setSearchParams({});
    setShowProfile(false);
    inputRef.current.value = "";
  };

  // 세션 여부에 따른 상태 변경
  useEffect(() => {
    if (lastAuthEvent === "SIGNED_IN") {
      setSuccessLogIn(true);
    }
    if (lastAuthEvent === "SIGNED_OUT") {
      setSuccessLogOut(true);
    }
    clearLastAuthEvent();
  }, [lastAuthEvent, clearLastAuthEvent]);

  // 로그인 성공 시
  useEffect(() => {
    if (!successLogIn) return;
    const timer = setTimeout(() => {
      setSuccessLogIn(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [successLogIn]);

  // 로그아웃 성공 시
  useEffect(() => {
    if (!successLogOut) return;
    const timer = setTimeout(() => {
      setSuccessLogOut(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [successLogOut]);

  // 로그아웃 핸들러
  const signOutHandler = () => {
    if (!session) return;
    setShowProfile(false);
    signOut();
    navigate("/main");
  };

  return (
    <section>
      <header className="relative inset-x h-full top-0 text-sm whitespace-nowrap text-white max-[1025px]:text-xs min-[2048px]:text-lg">
        <section className="flex fixed z-50 justify-between items-center bg-[#060c18] pl-4 max-[1025px]:pl-0 pr-10 py-5 w-screen h-20 max-[1025px]:h-14 max-[1025px]:px-5 min-[2048px]:h-32">
          {/* 메인 로고 */}
          <article className="shrink-0 pr-4">
            <Link to="/">
              <img
                className="max-[513px]:w-28 min-[2048px]:w-52 hover:scale-110 active:scale-110 duration-300"
                src={logo}
                width={140}
                alt="logo image"
              />
            </Link>
          </article>
          {/* 검색 & 모달 */}
          <section className="flex gap-4 max-[513px]:gap-2.5 w-full justify-end ">
            {/* {showModal && ( */}
            <input
              ref={inputRef}
              className={`${
                showModal ? "animate-fade-in" : "animate-fade-out"
              } text-black text-base min-[2048px]:text-2xl w-96 max-[1025px]:w-3/4 h-12 max-[1025px]:h-10 min-[2048px]:h-20 rounded-2xl min-[2048px]:rounded-4xl bg-white px-3 py-2 focus:border-2 border-[#FEE502] outline-none`}
              type="search"
              name=""
              id=""
              onAnimationEnd={() => {
                if (!showModal) setShowModal(false);
              }}
              onChange={(e) => {
                setQuery(e.target.value.trim());
                navigate(`?search=${e.target.value.trim()}`);
              }}
            />
            {/* )} */}

            <button className="cursor-pointer z-60" onClick={modalHandle}>
              검색
            </button>

            {/* 로그인 & 프로필 */}
            <section className="flex">
              <article className="flex justify-center items-center gap-4 z-[51]">
                {session && (
                  <div className="relative z-60">
                    <img
                      onClick={() => setShowProfile((prev) => !prev)}
                      className="cursor-pointer active:scale-90 min-[1024px]:w-6.5 min-[2048px]:w-8 bg-white  rounded-full"
                      width={20}
                      src={profile}
                    />

                    <div
                      onAnimationEnd={() => {
                        if (!showProfile) setShowProfile(false);
                      }}
                      className={`absolute top-8 min-[1024px]:top-11 min-[2048px]:top-14 right-0 flex flex-col justify-center items-center border rounded-lg bg-black ${
                        showProfile ? "animate-fade-in" : "animate-fade-out"
                      }`}
                    >
                      <Link
                        to={`/mypage/${session.user.id}`}
                        onClick={() => setShowProfile(false)}
                        className="px-6 py-2 cursor-pointer active:scale-90"
                      >
                        프로필
                      </Link>
                      <button
                        onClick={signOutHandler}
                        className="border-t border-white px-6 py-2 cursor-pointer text-[#a04455] active:scale-90"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
                {!session && <Link to="/login">로그인</Link>}
              </article>
            </section>
          </section>
        </section>

        {/* 로그인 토스트 */}
        {successLogIn && (
          <div className="fixed animate-fade-in text-center left-[48dvw] flex justify-center items-center max-[513px]:top-0 top-2 min-[2048px]:top-8 min-[2048px]:text-lg z-50 text-white text-nowrap">
            <span className="relative text-green-500">✔︎</span>
            <h2 className="py-4 px-1.5 flex justify-center">로그인</h2>
          </div>
        )}

        {successLogOut && (
          <div className="fixed animate-fade-in left-[48dvw] flex justify-center items-center max-[513px]:top-0 top-2 min-[2048px]:top-8 min-[2048px]:text-lg z-50 text-white text-nowrap">
            <span className="relative text-[#a04455]">✔︎</span>
            <h2 className="py-4 px-1.5 flex justify-center">로그아웃</h2>
          </div>
        )}
      </header>

      <div className="pt-16 max-[1025px]:pt-10 min-[2048px]:pt-28">
        <Outlet />

        {/* 공용 푸터 영역 */}
        <footer className="relative border-t text-gray-500 text-base max-[513px]:text-sm bottom-0 flex flex-col justify-center items-start px-6 max-[513px]:px-3 py-6 max-[513px]:py-3 bg-[#060c18] before:h-4/5 before:absolute before:left-2 before:content-[''] before:pr-0.5 before:mr-1.5 before:bg-white">
          <Link
            className="flex justify-center items-center hover:text-white active:text-white "
            to={"https://github.com/MXNKXNG"}
          >
            <img
              className="rounded-full max-[513px]:w-8"
              src={github}
              width={40}
            />
            GitHub
          </Link>
          <p className="pl-1 hover:text-white active:text-white ">
            oldscratch.co@gmail.com
          </p>
        </footer>
      </div>

      {/* 검색 모달 */}
      <ModalLayout showModal={showModal} onClose={modalHandle}>
        <SearchModal
          showModal={showModal}
          onClose={modalHandle}
          query={query}
        />
      </ModalLayout>
    </section>
  );
};
