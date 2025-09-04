import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieList } from "../components/MovieList";
import { fetchMovieList } from "../store/thunk";

export const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4 h-screen">
      <h1 className="text-lg py-2 w-full" aria-label="category name">
        상영 중인 영화
      </h1>
      <div className="flex gap-2 overflow-x-auto scrollbar-none ">
        {data.listData.results.map((el) => (
          <MovieList el={el} baseUrl={data.baseUrl} key={el.id} />
        ))}
      </div>
    </div>
  );
};
