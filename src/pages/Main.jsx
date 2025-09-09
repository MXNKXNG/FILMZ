import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/banner";
import { MovieCard } from "../components/MovieCard";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { fetchMovieList, fetchUpComingList } from "../store/thunk";
import { date } from "../utils/dataFilter";
import { loadFlag } from "../utils/loadingFlag";

export const Main = () => {
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movieList);
  const upComingData = useSelector((state) => state.upComingList);

  const isNowLoad = loadFlag(movieData.status, movieData.nowPlaying.data);
  const isPopularLoad = loadFlag(movieData.status, movieData.popular.data);
  const isUpComingLoad = loadFlag(
    upComingData.status,
    upComingData.upComing.data
  );

  const containerRef = useRef(null);

  // 영화 개봉 기간 필터
  const { upComing, nowPopular } = date;

  useEffect(() => {
    dispatch(
      fetchMovieList({
        page: 1,
        minDate: nowPopular.minDate,
        maxDate: nowPopular.maxDate,
      })
    );

    dispatch(
      fetchUpComingList({
        page: 1,
        minDate: upComing.minDate,
        maxDate: upComing.maxDate,
      })
    );
  }, [
    dispatch,
    nowPopular.minDate,
    nowPopular.maxDate,
    upComing.minDate,
    upComing.maxDate,
  ]);

  return (
    <main className="flex flex-col h-full gap-4 pb-10 select-none text-white font-semibold text-xl animate-fade-in max-[513px]:text-lg">
      {/* Up Coming List */}
      <section
        ref={containerRef}
        className="relative flex py-10 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {isUpComingLoad
          ? Array.from({ length: 10 }).map((_, idx) => (
              <MovieCardSkeleton
                className="w-dvw aspect-video flex mx-56  max-[1025px]:mx-0"
                idx={idx}
                key={idx}
              />
            ))
          : upComingData.upComing.data?.map((el) => (
              <Banner
                el={el}
                baseUrl={upComingData.baseUrl}
                key={el.id}
                containerRef={containerRef}
              />
            ))}
      </section>

      {/* Now Playing List */}
      <article className="flex flex-col z-20 pl-8 pr-2.5 max-[513px]:pl-1.5 max-[1025px]:pl-3.5">
        <h1 className=" w-full px-1" aria-label="category name">
          상영 중인 영화
        </h1>
        <div className="flex gap-5 max-[513px]:gap-2.5  py-3 overflow-x-auto scrollbar-none ">
          {isNowLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : movieData.nowPlaying.data?.map((el) => (
                <MovieCard el={el} baseUrl={movieData.baseUrl} key={el.id} />
              ))}
        </div>
      </article>

      {/* Popular List */}
      <article className="flex flex-col z-20 pl-8 pr-2.5 max-[513px]:pl-1.5 max-[1025px]:pl-3.5">
        <h1 className="w-full px-1" aria-label="category name">
          인기 있는 영화
        </h1>
        <div className="flex gap-5 max-[513px]:gap-2.5  py-3 overflow-x-auto scrollbar-none ">
          {isPopularLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : movieData.popular.data?.map((el, idx) => (
                <MovieCard
                  el={el}
                  variant="popular"
                  idx={idx}
                  baseUrl={movieData.baseUrl}
                  key={el.id}
                />
              ))}
        </div>
      </article>
    </main>
  );
};
