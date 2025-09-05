import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../components/MovieCard";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { fetchNowList, fetchPopularList } from "../store/thunk";
import { loadFlag } from "../utils/loadingFlag";

export const Main = () => {
  const dispatch = useDispatch();
  const nowData = useSelector((state) => state.nowList);
  const popularData = useSelector((state) => state.popularList);

  const isNowLoad = loadFlag(nowData.status, nowData.nowList);
  const isPopularLoad = loadFlag(popularData.status, popularData.popularList);

  useEffect(() => {
    dispatch(fetchNowList(1));
    dispatch(fetchPopularList(1));
  }, [dispatch]);

  return (
    <main className="flex flex-col h-full bg-black text-white text-xl font-medium gap-10 pb-10">
      <article className="flex justify-center items-center px-5 py-16 flex-nowrap ">
        <div className="overflow-x-auto scrollbar-none">
          <img
            className="aspect-[16/9] "
            src="https://image.tmdb.org/t/p/w500/mEW9XMgYDO6U0MJcIRqRuSwjzN5.jpg"
            alt="test"
          />
        </div>
      </article>
      <article className="flex flex-col pl-6 pr-1">
        <h1 className="py-4 w-full" aria-label="category name">
          상영 중인 영화
        </h1>
        <div className="flex gap-2 overflow-x-auto scrollbar-none ">
          {isNowLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : nowData.nowList.results?.map((el) => (
                <MovieCard el={el} baseUrl={nowData.baseUrl} key={el.id} />
              ))}
        </div>
      </article>

      <article className="flex flex-col pl-6 pr-1">
        <h1 className="py-4 w-full" aria-label="category name">
          인기 있는 영화
        </h1>
        <div className="flex gap-2 overflow-x-auto scrollbar-none ">
          {isPopularLoad
            ? Array.from({ length: 20 }).map((_, idx) => (
                <MovieCardSkeleton className="w-50" idx={idx} key={idx} />
              ))
            : popularData.popularList.results?.map((el, idx) => (
                <MovieCard
                  el={el}
                  variant="popular"
                  idx={idx}
                  baseUrl={popularData.baseUrl}
                  key={el.id}
                />
              ))}
        </div>
      </article>
    </main>
  );
};
