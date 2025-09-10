import { memo } from "react";
import { Link } from "react-router";

export const MovieCard = memo(({ el, baseUrl, idx, variant = "defalut" }) => {
  const ispopular = variant === "popular";

  return (
    <article className="relative flex py-2 hover:scale-110 active:scale-105 duration-300">
      <Link to={`/main/${el.id}`}>
        <figure className="relative flex flex-col w-50 max-[513px]:w-40 min-[2048px]:w-80">
          <img
            className="aspect-[2/3] object-cover rounded-2xl"
            src={`${baseUrl}${el.poster_path}`}
            alt="movie main poster"
          />
          {ispopular ? (
            <p className="absolute -top-3 -left-4 m-2 w-8 h-6 text-5xl min-[2048px]:text-7xl italic text-white text-shadow-md/50 text-shadow-[#FEE502] flex-1 rounded-md font-medium flex justify-center items-center ">
              {idx + 1}
            </p>
          ) : (
            <p
              className="absolute m-2 w-8 h-6 min-[2048px]:w-12 min-[2048px]:h-8 min-[2048px]:rounded-xl text-black bg-[#FEE502] flex-1 rounded-md text-xs min-[2048px]:text-lg font-semibold flex justify-center items-center"
              aria-label="average"
            >
              {Math.floor(el.vote_average * 10) / 10}
            </p>
          )}
          {/* hover 박스 */}
          <section className="absolute w-full h-full p-1 flex flex-col justify-start text-pretty items-center py-12 max-[513px]:py-10 text-white bg-black/60 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
            <h2 className="px-2 flex-1 text-xl min-[2048px]:text-2xl max-[513px]:text-base text-center mb-5 max-[513px]:mb-3">
              {el.title}
            </h2>
            <figcaption
              className="flex-2 font-light text-base min-[2048px]:font-normal min-[2048px]:text-lg max-[513px]:text-sm px-2 text-center line-clamp-5"
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
