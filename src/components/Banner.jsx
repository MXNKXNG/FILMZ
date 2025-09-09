import { memo, useRef } from "react";

export const Banner = memo(({ el, baseUrl, containerRef }) => {
  const articleRef = useRef(null);

  // 다음 DOM 요소
  const nextHandler = () => {
    const next = articleRef.current.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({
        block: "nearest",
      });
    } else {
      containerRef.current.scrollTo({ left: 0 });
    }
  };
  // 이전 DOM 요소
  const prevHandler = () => {
    const prev = articleRef.current.previousElementSibling;
    if (prev instanceof HTMLElement) {
      prev.scrollIntoView({
        block: "nearest",
      });
    }
  };

  return (
    <article
      ref={articleRef}
      className="relative w-[100dvw] p-8 max-[513px]:p-1.5 max-[1025px]:p-3.5 snap-center text-lg "
    >
      <figure className="w-[96dvw] max-[513px]:w-[90dvw] flex justify-center items-center">
        <img
          className="aspect-[16/9] w-3/4 max-[513px]:w-full rounded-2xl"
          src={`${baseUrl}${el.backdrop_path}`}
          alt="up-coming movie"
        />
      </figure>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 w-60 rounded-2xl max-[1025px]:w-30 h-full flex justify-start items-center opacity-0 hover:opacity-100 bg-gradient-to-r from-black/40 from-10% to-transparent to-90% transition-all duration-300 max-[513px]:hidden"
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
