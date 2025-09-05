import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { fetchMovieDetail, fetchMovieLogo } from "../store/thunk";
import { DEFAULT_COLOR, GENRE_COLOR } from "../utils/genreColor";
import { loadFlag } from "../utils/loadingFlag";

export const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.detail);
  const param = useParams();
  const logos = useSelector((state) => state.logo);
  const filteredLogo =
    logos.logo?.find((el) => el.iso_639_1 === "ko") ??
    logos.logo?.find((el) => el.iso_639_1 === "en");
  const isDetailLoad = loadFlag(data.status, data.detail);
  const isLogoLoad = loadFlag(logos.status);

  useEffect(() => {
    dispatch(fetchMovieDetail(Number(param.id)));
    dispatch(fetchMovieLogo(Number(param.id)));
  }, [dispatch, param]);

  return (
    <section className="bg-[#2a2c34] flex h-full flex-col px-30 py-20 text-pretty max-[1025px]:items-center max-[1025px]:p-15">
      {/* 영화 로고 */}
      <figure className="h-1/5 flex justify-center items-center mb-4">
        {isLogoLoad ? (
          <MovieCardSkeleton className={`w-[70dvw] h-[15dvh]`} />
        ) : (
          (filteredLogo && (
            <img
              className="object-contain max-h-70 max-[1025px]:max-h-50"
              src={`${logos.baseUrl}${filteredLogo?.file_path}`}
              alt="Movie Logo"
            />
          )) ||
          ""
        )}
      </figure>
      {isDetailLoad ? (
        <MovieCardSkeleton className="flex justify-center items-center w-full" />
      ) : (
        <article className="relative w-full flex my-5 text-white rounded-4xl p-20 bg-black max-[1025px]:flex-col max-[1025px]:p-12 ">
          {/* 닫기 */}
          <button
            className="absolute top-5 right-5 h-10 w-10 z-20 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <span className="h-[1px] w-10 bg-gray-500 absolute top-5 right-0 rotate-45 z-30"></span>
            <span className="h-[1px] w-10 bg-gray-500 absolute top-5 right-0 -rotate-45 z-30"></span>
          </button>
          {/* 메인 포스터 */}
          <figure className="p-4 flex-1 flex ">
            {(data.detail?.poster_path && (
              <img
                className="aspect-[2/3] w-full object-cover rounded-3xl z-10 "
                src={`${data.baseUrl}${data.detail?.poster_path}`}
                alt="Movie main poster"
              />
            )) || <p>{data.detail?.status_message}</p>}
          </figure>

          {/* 뒷 배경 이미지 */}
          <figure className="absolute top-0 left-0 w-full ">
            {(data.detail?.backdrop_path && (
              <img
                className="aspect-[6/4] w-full object-cover  opacity-15 rounded-t-4xl max-[1025px]:aspect-[2/3]"
                src={`${data.baseUrl}${data.detail?.backdrop_path}`}
                alt="Backdrop image"
              />
            )) ||
              ""}
          </figure>
          {/* 텍스트 정보 */}
          {/* row 1 */}
          <article className="flex flex-col flex-1 px-4 py-8 h-full ">
            <div className="flex justify-between items-center pb-2 gap-15">
              <p className="">{data.detail?.original_title}</p>
              <p className="text-sm font-light">
                {data.detail?.release_date?.slice(0, 4) || "-"}
              </p>
            </div>
            {/* row 2 */}
            <div className="relative pt-6 flex flex-col gap-3 ustify-start ">
              <div className="flex justify-between text-2xl font-bold gap-15">
                <h1 className="">{data.detail?.title ?? ""}</h1>
                <p
                  className={`${
                    data.detail?.vote_average < 4
                      ? "text-[#505050]"
                      : data.detail?.vote_average < 7
                      ? "text-[#119613]"
                      : "text-[#f9dc00]"
                  } right-0`}
                >
                  {isFinite(Math.floor(data.detail?.vote_average))
                    ? Math.floor(data.detail?.vote_average * 10) / 10
                    : "-"}
                </p>
              </div>
              {/* row 3 */}
              <div className="flex text-xs gap-2 items-center pb-5">
                {(data.detail?.genres ?? []).slice(0, 2).map((g) => (
                  <p
                    key={g.id}
                    className={`rounded-lg px-3 py-2 ${
                      GENRE_COLOR[g.id] ?? DEFAULT_COLOR
                    } `}
                  >
                    {g.name ?? ""}
                  </p>
                ))}
                <p className=""> • {data.detail?.runtime ?? 0}분</p>
              </div>
              {/* row 4 */}

              <p className="flex py-5 text-xl">{data.detail?.tagline ?? ""}</p>
            </div>
            {/* row 5 */}

            <article className="pt-10">
              <p className="text-base/relaxed">
                {data.detail?.overview || "줄거리 정보가 없습니다."}
              </p>
            </article>
          </article>
        </article>
      )}
    </section>
  );
};
