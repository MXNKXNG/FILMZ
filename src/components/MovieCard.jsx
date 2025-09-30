import { memo } from "react";
import { Link } from "react-router";
import Empty from "../assets/poster.png";

export const MovieCard = memo(({ el, baseUrl, idx, variant = "defalut" }) => {
  const ispopular = variant === "popular";

  return (
    <article
      className={`relative ${
        ispopular && "pl-28 max-[513px]:pl-24 min-[2048px]:pl-44"
      } flex py-2 px-2 `}
    >
      {ispopular && (
        <p className="absolute w-40 select-none top-36 -left-10 max-[513px]:-left-16 max-[513px]:top-32 max-[513px]:text-[100px] text-[140px] tracking-[-0.70rem] min-[2048px]:tracking-[-1rem] min-[2048px]:text-[210px] min-[2048px]:top-60  min-[2048px]:left-8 italic text-white text-shadow-[0px_2px_5px_#FEE502] flex-1 flex justify-end">
          {idx + 1}
        </p>
      )}
      <Link
        className="hover:scale-105 active:scale-105 duration-300 group"
        to={`/main/${el.id}`}
      >
        <figure className="relative flex w-50 max-[513px]:w-40 min-[2048px]:w-80">
          {el.poster_path ? (
            <img
              className="aspect-[2/3] object-cover rounded-2xl"
              src={`${baseUrl}${el.poster_path}`}
              alt="movie main poster"
              draggable={false}
            />
          ) : (
            <img
              className="aspect-[2/3] object-cover rounded-2xl"
              src={Empty}
              alt="movie main poster"
              draggable={false}
            />
          )}

          {/* hover 박스 */}
          <section className="pointer-events-none absolute w-full h-full p-1 flex flex-col justify-start text-pretty items-center py-12 min-[2048px]:py-[124px] max-[513px]:py-10 text-white bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500">
            <p
              className="absolute top-2 min-[2048px]:top-8 right-2 w-7 h-5 rounded-md text-xs min-[2048px]:w-12 min-[2048px]:h-8 min-[2048px]:right-8 min-[2048px]:rounded-xl text-black bg-[#FEE502] min-[2048px]:text-lg font-semibold flex justify-center items-center"
              aria-label="average"
            >
              {Math.floor(el.vote_average * 10) / 10}
            </p>

            <h2 className="px-2 flex-1 text-xl min-[2048px]:text-3xl max-[513px]:text-base text-center mb-5 max-[513px]:mb-3">
              {el.title}
            </h2>
            <figcaption
              className="flex-2 font-light text-base min-[2048px]:font-normal min-[2048px]:text-xl max-[513px]:text-sm px-2 min-[2048px]:px-6 text-center line-clamp-5"
              aria-label="movie title"
            >
              {el.overview}
            </figcaption>
          </section>
        </figure>
      </Link>
    </article>
  );
});
