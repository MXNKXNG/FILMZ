import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/Banner";
import { MovieCard } from "../components/MovieCard";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { useDragScroll } from "../hooks/useDragScroll";
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
  const popularTop = movieData.popular?.data?.slice(0, 10);
  // UpComing Day 계산을 위한 오늘 날짜
  const today = dayjs().startOf("day");

  // 영화 개봉 기간 필터
  const { upComing, nowPopular } = date;

  // Upcoming 배너
  const containerRef = useRef(null);
  // 각 가로 스크롤 컨테이너
  const nowRef = useRef(null);
  const popularRef = useRef(null);
  const koreaRef = useRef(null);

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

  useDragScroll(nowRef, { axis: "x" });
  useDragScroll(popularRef, { axis: "x" });
  useDragScroll(koreaRef, { axis: "x" });

  return (
    <main className="flex flex-col h-full gap-6 max-[1025px]:gap-2 pb-10 text-white font-semibold text-xl min-[2048px]:text-3xl animate-fade-in max-[513px]:text-lg bg-radial-[at_15%_10%] from-[#1f202d] to-[#060c18] to-30%">
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
          : upComingData.upComing.data?.map((el) => {
              const diff = dayjs(el.release_date)
                .startOf("day")
                .diff(today, "day");
              return (
                <Banner
                  el={el}
                  baseUrl={upComingData.baseUrl}
                  key={el.id}
                  containerRef={containerRef}
                  diff={diff}
                />
              );
            })}
      </section>

      {/* Now Playing List */}
      <article className="flex flex-col z-20 pl-8 pr-2.5 max-[513px]:pl-1.5 max-[1025px]:pl-3.5">
        <h1 className=" w-full px-1" aria-label="category name">
          현재 상영 중인 영화
        </h1>
        <div
          ref={nowRef}
          className="flex py-4 min-[2048px]:py-8 overflow-x-auto scrollbar-none cursor-grab [&.is-dragging]:cursor-grabbing"
        >
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
        <h1 className="w-full px-1  " aria-label="category name">
          인기 영화 TOP 10
        </h1>
        <div
          ref={popularRef}
          className="flex py-4 min-[2048px]:py-8 overflow-x-auto scrollbar-none overflow-y-hidden cursor-grab [&.is-dragging]:cursor-grabbing"
        >
          {isPopularLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : popularTop.map((el, idx) => (
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

      {/* Korea Made List */}
      <article className="flex flex-col z-20 pl-8 pr-2.5 max-[513px]:pl-1.5 max-[1025px]:pl-3.5">
        <h1 className="w-full px-1" aria-label="category name">
          한국 제작 영화
        </h1>
        <div
          ref={koreaRef}
          className="flex py-4 min-[2048px]:py-8 overflow-x-auto scrollbar-none cursor-grab [&.is-dragging]:cursor-grabbing"
        >
          {isPopularLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : movieData.koreaMade.data?.map((el) => (
                <MovieCard el={el} baseUrl={movieData.baseUrl} key={el.id} />
              ))}
        </div>
      </article>
    </main>
  );
};
