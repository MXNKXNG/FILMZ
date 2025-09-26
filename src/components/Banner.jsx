import { memo, useRef } from "react";
import { Link } from "react-router";
import backdrop from "../assets/backdrop.png";

export const Banner = memo(({ el, baseUrl, containerRef, diff }) => {
  const articleRef = useRef(null);

  // 다음 DOM 요소
  function nextHandler() {
    const next = articleRef.current.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({
        block: "nearest",
      });
    } else {
      containerRef.current.scrollTo({ left: 0 });
    }
  }
  // 이전 DOM 요소
  const prevHandler = () => {
    const prev = articleRef.current.previousElementSibling;
    if (prev instanceof HTMLElement) {
      prev.scrollIntoView({
        block: "nearest",
      });
    }
  };

  console.log(el);

  return (
    <article
      ref={articleRef}
      className="relative w-dvw p-8 max-[513px]:p-1.5 max-[1025px]:p-3.5 snap-center text-base text-pretty"
    >
      <figure className="w-[96dvw] max-[513px]:w-[90dvw] max-[1025px]:w-[94dvw] flex justify-center items-center">
        {el.backdrop_path ? (
          <img
            className="aspect-video rounded-2xl"
            src={`${baseUrl}${el.backdrop_path}`}
            alt="up-coming movie"
          />
        ) : (
          <img src={backdrop} className="aspect-video rounded-2xl" />
        )}
      </figure>
      {/* 텍스트 영역 */}
      <section className="absolute flex flex-col justify-end max-[1025px]:h-36 bottom-16 max-[1025px]:bottom-4 min-[2048px]:bottom-40 left-1/12 py-3 w-3/4 pr-4 ">
        <div className="pr-4">
          <h3 className="text-xl max-[513px]:text-xs max-[1025px]:text-base font-light min-[2048px]:text-3xl text-gray-300">
            {el.original_title}
          </h3>
        </div>
        <div className="min-[1024px]:pb-4 flex items-center gap-4 max-[513px]:gap-2.5 pr-4">
          <h2 className="text-3xl max-[513px]:text-base max-[1025px]:text-2xl min-[2048px]:text-4xl min-[2048px]:py-6">
            {el.title}
          </h2>
          <Link
            to={`/main/${el.id}`}
            className="flex justify-center items-center aspect-square w-8 max-[513px]:w-5 max-[1025px]:w-6 border-2 max-[513px]:border text-sm max-[513px]:text-[10px] min-[2048px]:text-lg rounded-full cursor-pointer z-50"
          >
            i
          </Link>
        </div>
      </section>

      {/* 디데이 */}
      <section className=" absolute text-lg max-[513px]:text-xs min-[2048px]:text-2xl top-12 max-[513px]:top-4 right-1/12 flex flex-col w-40 max-[513px]:w-16 max-[1025px]:w-28">
        <div
          className={`w-full bg-gradient-to-l px-1 from-${100 - diff}% ${
            diff >= 30
              ? "from-gray-500 via-transparent"
              : diff >= 8
              ? "from-[#FEE502] via-[#FEE502]"
              : "from-red-500 via-red-500"
          }  via-${100 - diff}% to-100% to-transparent`}
        >
          D -{diff}
        </div>
      </section>

      {/* 이미지 스냅 버튼 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 w-50 rounded-2xl max-[1025px]:w-30 h-full flex justify-start items-center opacity-0 hover:opacity-100 bg-gradient-to-r from-black/40 from-10% to-transparent to-90% transition-all duration-300 max-[513px]:hidden"
      >
        <button
          onClick={prevHandler}
          className="cursor-pointer w-1/2 pr-10 pl-2 h-full flex justify-end items-center"
        >
          〈
        </button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 w-60 rounded-2xl max-[1025px]:w-30 h-full flex justify-end items-center opacity-0 hover:opacity-100 bg-gradient-to-l from-black/40 from-10% to-transparent to-90% transition-all duration-300 max-[513px]:hidden"
      >
        <button
          onClick={nextHandler}
          className="cursor-pointer w-1/2 pl-10 pr-2 h-full flex justify-start items-center"
        >
          〉
        </button>
      </div>
    </article>
  );
});
