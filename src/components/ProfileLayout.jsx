import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { useSupabase } from "../context/AuthProvider";

export const ProfileLayout = () => {
  const { session } = useSupabase();
  const [showNav, setShowNav] = useState(false);
  const { pathname } = useLocation();
  const navList = [
    { label: "프로필 홈", path: `/mypage/${session?.user?.id}`, end: true },
    { label: "내 정보", path: `/mypage/info/${session?.user?.id}` },
    { label: "내가 찜한 리스트", path: `/mypage/list/${session?.user?.id}` },
  ];

  const activeIndex =
    navList.findIndex((el) => el.path === pathname) >= 0
      ? navList.findIndex((el) => el.path === pathname)
      : navList.findIndex((el) => pathname.startsWith(el.path));
  const activeList = navList[activeIndex] ?? navList[0];
  const restList = navList.filter((_, i) => i !== activeIndex);

  return (
    <div className="flex flex-col h-dvh w-full bg-radial-[at_15%_10%] from-[#1f202d] to-[#060c18] to-30% whitespace-nowrap font-normal text-white text-base min-[1024px]:text-lg min-[2048px]:text-2xl">
      <section className="flex flex-col mt-6 w-full gap-2 max-[513px]:text-sm text-base min-[2048px]:text-xl">
        <div className="flex justify-between items-center px-4">
          <NavLink
            className="text-[#a52d43]"
            to={activeList.path}
            end={Boolean(activeList.end)}
          >
            {activeList.label}
          </NavLink>

          <button
            className="px-4 pb-2 cursor-pointer flex justify-center items-center"
            onClick={() => setShowNav((prev) => !prev)}
          >
            ⌄
          </button>
        </div>

        <nav
          className={`flex flex-col items-start w-4/5 ${
            showNav ? "opacity-100 translate-0" : "opacity-0 -translate-y-2"
          } items-center gap-2 transition-all duration-300`}
        >
          {restList.map((el) => (
            <NavLink
              key={el.path}
              end={Boolean(el.end)}
              to={el.path}
              className="px-4 cursor-pointer opacity-60 transition-all duration-300 active:scale-90"
            >
              {el.label}
            </NavLink>
          ))}
        </nav>
      </section>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};
