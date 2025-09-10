import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { fetchDetails } from "../store/thunk";
import { DEFAULT_COLOR, GENRE_COLOR } from "../utils/genreColor";
import { loadFlag } from "../utils/loadingFlag";

export const Detail = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const details = useSelector((state) => state.details);
  const filteredLogo =
    details.data?.images?.logos?.find((el) => el.iso_639_1 === "ko") ??
    details.data?.images?.logos?.find((el) => el.iso_639_1 === "en");
  const isDetailLoad = loadFlag(details.status, details.data);

  console.log(details);

  useEffect(() => {
    dispatch(fetchDetails(Number(param.id)));
  }, [dispatch, param]);

  return (
    <section className="flex h-full pb-40 flex-col items-center justify-center text-pretty animate-fade-in px-40 max-[513px]:px-4 max-[1025px]:px-16 bg-radial-[at_5%_15%] from-[#413137] via-[#2c1818] to-[#1b0d0d]">
      {/* 영화 로고 */}
      <figure className="flex justify-center items-center pt-8 m-4 pointer-events-none w-full">
        {isDetailLoad ? (
          <MovieCardSkeleton className="w-1/2 max-h-40 px-10  max-[1025px]:max-h-30 min-[2048px]:py-10 min-[2048px]:max-h-60" />
        ) : (
          (filteredLogo && (
            <img
              className="object-contain max-h-40 px-10 max-[1025px]:max-h-30 min-[2048px]:py-10 min-[2048px]:max-h-60"
              src={`${details.baseUrl}${filteredLogo?.file_path}`}
              alt="Movie Logo"
            />
          )) ||
          ""
        )}
      </figure>
      {isDetailLoad ? (
        <MovieCardSkeleton className="flex justify-center items-center w-full" />
      ) : (
        <article className="-z-10 relative w-full flex  text-white rounded-4xl bg-black shadow-[4px_10px_20px_rgba(0,0,0,0.7)] flex-col min-[2048px]:px-24 py-14 max-[513px]:px-4 px-16">
          {/* 닫기 버튼 */}
          <button
            className="absolute top-5 min-[2048px]:top-8 right-5 h-10 w-10 max-[513px]:w-6 min-[2048px]:w-16 min-[2048px]:h-16 z-20 cursor-pointer hover:scale-110 active:scale-110 duration-300"
            onClick={() => navigate("/main")}
          >
            <span className="h-[1px] w-10 max-[513px]:w-6 min-[2048px]:w-16 bg-gray-500 absolute top-5 min-[2048px]:top-8 right-0 rotate-45 z-30"></span>
            <span className="h-[1px] w-10 max-[513px]:w-6 min-[2048px]:w-16 bg-gray-500 absolute top-5 min-[2048px]:top-8 right-0 -rotate-45 z-30"></span>
          </button>
          <div className="flex max-[1025px]:flex-col">
            {/* 메인 포스터 */}
            <figure className="p-4 flex-2 flex justify-center pointer-events-none ">
              {(details.data?.poster_path && (
                <img
                  className="aspect-[2/3] h-1/1 object-cover rounded-3xl z-10"
                  src={`${details.baseUrl}${details.data?.poster_path}`}
                  alt="Movie main poster"
                />
              )) || <p>{details.data?.status_message}</p>}
            </figure>

            {/* 뒷 배경 이미지 */}
            <figure className="absolute top-0 -z-10 left-0 w-full h-full pointer-events-none">
              {(details.data?.backdrop_path && (
                <img
                  className="aspect-[16/9] w-full object-cover min-[512px]:h-3/4 opacity-15 rounded-t-4xl max-[1025px]:aspect-[2/3]"
                  src={`${details.baseUrl}${details.data?.backdrop_path}`}
                  alt="Backdrop image"
                />
              )) ||
                ""}
            </figure>

            {/* 텍스트 정보 */}
            {/* row 1 */}
            <article className="flex flex-col flex-3 px-4 py-10 h-full text-base max-[513px]:text-sm min-[1024px]:text-lg min-[2048px]:text-2xl">
              <div className="flex justify-between items-center pb-2 gap-15 text-gray-400">
                <p className="">{details.data?.original_title}</p>
                <p className="font-light ">
                  {details.data?.release_date?.slice(0, 4) || "-"}
                </p>
              </div>
              {/* row 2 */}
              <div className="flex justify-between py-2 text-xl font-bold gap-15 min-[1024px]:text-2xl min-[2048px]:text-3xl">
                <h1 className="">{details.data?.title ?? ""}</h1>
                <p
                  className={`${
                    details.data?.vote_average < 4
                      ? "text-[#505050]"
                      : details.data?.vote_average < 7
                      ? "text-[#119613]"
                      : "text-[#f9dc00]"
                  } right-0`}
                >
                  {details.data?.vote_average == 0
                    ? "-"
                    : isFinite(Math.floor(details.data?.vote_average))
                    ? Math.floor(details.data?.vote_average * 10) / 10
                    : "-"}
                </p>
              </div>
              {/* row 3 */}
              <div className="flex gap-2 min-[2048px]:gap-4 items-center pb-5 text-[10px] font-semibold min-[1024px]:text-xs min-[2048px]:text-lg">
                {(details.data?.genres ?? []).slice(0, 2).map((g) => (
                  <p
                    key={g.id}
                    className={`rounded-lg px-4 py-2 ${
                      GENRE_COLOR[g.id] ?? DEFAULT_COLOR
                    } `}
                  >
                    {g.name ?? ""}
                  </p>
                ))}
                {details.data?.runtime == 0 ? (
                  "-"
                ) : (
                  <p> • {details.data?.runtime}분</p>
                )}
              </div>
              {/* row 4 */}
              {details.data?.tagline && (
                <p className="flex py-4">{details.data?.tagline}</p>
              )}
              {/* row 5 */}
              <article className="pt-8">
                <p className="leading-6 max-[513px]:leading-5 min-[2048px]:leading-8">
                  {details.data?.overview || "줄거리 정보가 없습니다."}
                </p>
              </article>
            </article>
          </div>
          <article className="flex flex-col gap-4">
            <div>
              <h6>추가 이미지</h6>
              <div className="flex overflow-scroll scrollbar-none">
                {details.data?.images?.backdrops?.map((el) => (
                  <img width={160} src={`${details.baseUrl}${el.file_path}`} />
                ))}
              </div>
            </div>
            <div></div>
          </article>
        </article>
      )}
    </section>
  );
});
