import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
import github from "../assets/GitHub.png";
import logo from "../assets/logo2.png";
import { ModalLayout } from "./ModalLayout";
import { SearchModal } from "./SearchModal";

export const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const modalHandle = () => {
    setShowModal(false);
    setSearchParams({});
  };

  return (
    <section>
      <header className="relative inset-x h-full top-0 text-sm whitespace-nowrap text-white max-[1025px]:text-xs min-[2048px]:text-2xl">
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
          <section className="flex gap-4 w-full justify-end">
            {showModal && (
              <input
                ref={inputRef}
                className="animate-fade-in text-black text-base min-[2048px]:text-2xl w-96 max-[1025px]:w-full h-12 max-[1025px]:h-10 min-[2048px]:h-20 rounded-2xl min-[2048px]:rounded-4xl bg-white px-3 py-2 focus:border-2 border-[#FEE502] outline-none"
                type="search"
                name=""
                id=""
                onChange={(e) => {
                  setQuery(e.target.value.trim());
                  navigate(`?search=${e.target.value.trim()}`);
                }}
              />
            )}

            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModal((prev) => !prev);
                setSearchParams({});
              }}
            >
              검색
            </button>

            {/* 로그인 & 회원가입 */}
            <section className="flex">
              <ul className="flex justify-center items-center gap-4">
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </header>

      <div className="pt-16 max-[1025px]:pt-10 min-[2048px]:pt-32">
        <Outlet />
        <footer className="relative border-t text-gray-500 text-base max-[513px]:text-sm bottom-0 flex flex-col justify-center items-start px-6 max-[513px]:px-3 py-6 max-[513px]:py-3 mb-2 before:h-4/5 before:absolute before:left-2 before:content-[''] before:pr-0.5 before:mr-1.5 before:bg-white">
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
          {/* <div className="absolute left-3 max-[513px]:left-1.5  w-[1px] max-[513px]:w-[0.5px] h-9/12  bg-white"></div> */}
        </footer>
      </div>

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
