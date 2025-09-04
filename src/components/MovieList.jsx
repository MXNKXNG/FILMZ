import { Link } from "react-router";

export const MovieList = ({ el, baseUrl }) => {
  return (
    <article className="relative flex px-2 py-2 ">
      <Link to={`/main/${el.id}`}>
        <figure className="relative rounded-2xl bg-gray-200 flex flex-col w-50 ">
          <img
            className="aspect-[2/3] object-cover rounded-2xl"
            src={`${baseUrl}${el.poster_path}`}
            alt=""
          />
          <p
            className="absolute m-2 w-8 h-6 bg-gray-300 flex-1 rounded-xl text-sm flex justify-center items-center"
            aria-label="average"
          >
            {Math.floor(el.vote_average * 10) / 10}
          </p>

          <section className="absolute w-full h-full p-1 flex flex-col justify-center items-center gap-5 text-white bg-black/60 py-10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity">
            <h2 className="h-1/4 px-2 pb-10 text-xl text-center ">
              {el.title}
            </h2>
            <figcaption
              className=" font-light w-full h-3/4 text-pretty px-2  text-center line-clamp-6"
              aria-label="movie title"
            >
              {el.overview}
            </figcaption>
          </section>
        </figure>
      </Link>
    </article>
  );
};
