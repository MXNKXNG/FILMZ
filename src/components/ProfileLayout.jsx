import { NavLink, Outlet } from "react-router";
import profile from "../assets/profile.png";
import { useSupabase } from "../context/AuthProvider";

export const ProfileLayout = () => {
  const { session } = useSupabase();

  return (
    <div className="h-dvh w-full bg-radial-[at_15%_10%] from-[#1f202d] to-[#060c18] to-30% whitespace-nowrap font-normal text-white text-base min-[1024px]:text-lg min-[2048px]:text-2xl">
      <section className="fixed flex flex-col gap-6 py-10 w-60 border-gray-500 border rounded-2xl bg-[#060c18]">
        <article className="flex flex-col justify-center items-center pb-10 gap-2 border-gray-500 border-b">
          <img
            className="bg-white rounded-full"
            src={profile}
            width={120}
            alt="profile Image"
          />
          <p>{session?.user?.email}</p>
        </article>
        <nav className="flex flex-col gap-4 px-4">
          <NavLink
            to={`/mypage/${session.user.id}`}
            end
            className=" cursor-pointer active:scale-90 aria-[current=page]:text-rose-500 aria-[current=page]:font-semibold"
          >
            프로필
          </NavLink>
          <NavLink
            to={`/mypage/info/${session.user.id}`}
            className=" cursor-pointer active:scale-90 aria-[current=page]:text-rose-500 aria-[current=page]:font-semibold"
          >
            내 정보
          </NavLink>
          <NavLink
            to={`/mypage/list/${session.user.id}`}
            className=" cursor-pointer active:scale-90 aria-[current=page]:text-rose-500 aria-[current=page]:font-semibold"
          >
            내가 찜한 리스트
          </NavLink>
        </nav>
      </section>
      <div className="ml-60 py-10 px-4">
        <Outlet />
      </div>
    </div>
  );
};
