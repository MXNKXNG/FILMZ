import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignUpComplete = ({ userInfo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <section className="w-full flex justify-center items-center text-white animate-fade-in">
      <article className="aspect-square h-1/2 flex flex-col gap-4 justify-center items-center w-120 max-[513px]:w-56 max-[1025px]:w-80">
        <div className="relative w-full text-center">
          <h2 className="py-4 flex justify-center items-center">
            회원가입이 완료되었습니다.
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-[24px] text-green-500 relative">
            ✹
            <span className="text-[8px] text-white font-bold absolute left-[6px] top-[12px]">
              ✓
            </span>
          </span>
          <p className="">{userInfo}</p>
        </div>
      </article>
    </section>
  );
};
