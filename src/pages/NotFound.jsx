import { Link } from "react-router";

export const NotFound = () => {
  return (
    <section className="h-dvh py-20 text-white flex flex-col justify-center items-center text-base font-light max-[513px]:text-sm">
      <h1 className="pb-10">페이지 정보가 없습니다.</h1>
      <Link
        className="cursor-pointer p-2 active:scale-90 hover:text-white text-gray-500 border rounded-xl"
        to="/"
      >
        홈으로 가기
      </Link>
    </section>
  );
};
