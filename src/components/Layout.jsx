import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
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
      <header className="relative inset-x h-full top-0 text-sm whitespace-nowrap text-white max-[1025px]:text-xs">
        <section className="flex fixed z-50 justify-between items-center bg-[#131622] pl-4 max-[1025px]:pl-0 pr-10 py-5 w-screen h-20 max-[1025px]:h-14 max-[1025px]:px-5">
          {/* 메인 로고 */}
          <article className="shrink-0 pr-4">
            <Link to="/">
              <img
                className="max-[513px]:w-28 hover:scale-110 active:scale-110 duration-300"
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
                className="animate-fade-in text-black text-base w-96 max-[1025px]:w-full h-12 max-[1025px]:h-10 rounded-2xl bg-white px-3 py-2 focus:border-2 border-[#FAC601] outline-none"
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
                  <Link to="/main">로그인</Link>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </header>

      <div className="pt-16 max-[1025px]:pt-10">
        <Outlet />
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
