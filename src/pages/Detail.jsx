import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../store/thunk";
export const Detail = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movieDetail);

  useEffect(() => {
    dispatch(fetchMovieDetail());
  }, [dispatch]);

  return (
    <section className="bg-gray-800 p-20">
      <article className="relative flex my-5 text-white rounded-2xl p-20 bg-black max-[1025px]:flex-col ">
        <figure className="relative p-4 flex-1 flex ">
          <img
            className="aspect-[2/3] w-full object-cover rounded-2xl"
            src={`${data.baseUrl}${data.detailData.poster_path}`}
            alt="movie poster"
          />
        </figure>
        <figure className="absolute left-0 w-full py-5 rounded-3xl ">
          <img
            className="aspect-[6/4] w-full object-cover opacity-15  "
            src={`${data.baseUrl}${data.detailData.poster_path}`}
            alt=""
          />
        </figure>
        <article className="flex flex-col flex-1 px-4 py-8 h-full rounded-2xl">
          <div className="flex justify-between items-center pb-2">
            <p className="">{data.detailData.status}</p>
            <p className="text-sm font-light">{data.detailData.release_date}</p>
          </div>
          <div className="relative flex flex-col gap-3 ustify-start ">
            <h1 className="flex text-2xl font-semibold">
              {data.detailData.title}
            </h1>
            <p className="absolute right-0 text-sm flex justify-center items-center">
              {Math.floor(data.detailData.vote_average * 10) / 10}
            </p>
            <div className="flex text-xs gap-1 items-center">
              {(data.detailData?.genres ?? []).slice(0, 2).map((g) => (
                <p key={g.id} className="border rounded-lg p-1">
                  {g.name}
                </p>
              ))}
              <p> • {data.detailData.runtime}분</p>
            </div>
            <p className="flex py-5">{data.detailData.tagline}</p>
          </div>
          <article className="pt-10">
            <p className="">{data.detailData.overview}</p>
          </article>
        </article>
      </article>
    </section>
  );
};
