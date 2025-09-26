import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Empty from "../assets/poster.png";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { useDragScroll } from "../hooks/useDragScroll";
import { fetchDetails } from "../store/thunk";
import { DEFAULT_COLOR, GENRE_COLOR } from "../utils/genreColor";
import { loadFlag } from "../utils/loadingFlag";

export const Detail = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const castRef = useRef(null);
  const subImgRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);
  const details = useSelector((state) => state.details);
  const filteredLogo =
    details.data?.images?.logos?.find((el) => el.iso_639_1 === "ko") ??
    details.data?.images?.logos?.find((el) => el.iso_639_1 === "en");
  const isDetailLoad = loadFlag(details.status, details.data);

  const getYouTube = details.data?.videos?.results.filter(
    (el) => el.site === "YouTube"
  );

  const hasProfileImg = details?.data?.credits?.cast?.filter(
    (el) => el.profile_path
  );

  useEffect(() => {
    dispatch(fetchDetails(Number(param.id)));
  }, [dispatch, param]);

  // 가로 스크롤 컨테이너 이벤트 핸들러
  useDragScroll(castRef, { axis: "x" });
  useDragScroll(subImgRef, { axis: "x" });
  useDragScroll(videoRef, { axis: "x" });

  // Video 도트 클릭 핸들러
  const choiceVideoHandle = (idx) => {
    const track = videoRef.current;
    if (!track) return;
    const target = track.children[idx];
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActive(idx);
  };

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
        <article className="relative w-full h-full flex flex-col text-white rounded-4xl bg-black shadow-[4px_10px_20px_rgba(0,0,0,0.7)] min-[2048px]:px-24 py-14 max-[513px]:px-4 px-16">
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
            <figure className="p-4 flex shrink-1 justify-center pointer-events-none ">
              {(details.data?.poster_path && (
                <img
                  className="aspect-[2/3] object-cover rounded-3xl z-10"
                  src={`${details.baseUrl}${details.data?.poster_path}`}
                  alt="Movie main poster"
                />
              )) || (
                <img
                  className="aspect-[2/3] object-cover rounded-3xl z-10"
                  src={Empty}
                  alt="Movie main poster"
                />
              )}
            </figure>

            {/* 뒷 배경 이미지 */}
            <figure className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {(details.data?.backdrop_path && (
                <img
                  className="aspect-[16/9] w-full object-cover min-[512px]:h-3/4 opacity-15 rounded-t-4xl max-[1025px]:aspect-[2/3]"
                  src={`${details.baseUrl}${details.data?.backdrop_path}`}
                  alt="Backdrop image"
                />
              )) ||
                ""}
            </figure>

            {/* 오리지널 타이틀 & 개봉 연도 */}
            <article className="flex flex-col shrink-2 px-4 py-10  h-full text-base max-[513px]:text-sm min-[1024px]:text-lg min-[2048px]:text-2xl">
              <div className="flex justify-between items-center pb-2 gap-15 text-gray-400">
                <p className="">{details.data?.original_title}</p>
                <p className="font-light ">
                  {details.data?.release_date?.slice(0, 4) || "-"}
                </p>
              </div>

              {/* 타이틀 & 평점 */}
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

              {/* 장르 */}
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
              {/* 한 줄 태그 */}
              {details.data?.tagline && (
                <p className="flex py-4 min-[2048px]:py-8">
                  {details.data?.tagline}
                </p>
              )}
              {/* 줄거리 */}
              <div className="pt-8">
                <p className="leading-6 max-[513px]:leading-5 min-[2048px]:leading-8">
                  {details.data?.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>
            </article>
          </div>

          {/* 추가 이미지 & 영상 */}
          <article className="flex cursor-grab [&.is-dragging]:cursor-grabbing py-16 max-[513px]:py-12 min-[2048px]:py-24 flex-col px-4 text-base min-[1024px]:text-xl min-[2048px]:text-2xl z-10">
            <h6>추가 이미지</h6>
            <div
              ref={subImgRef}
              className="flex cursor-grab py-4 max-[513px]:py-2 overflow-scroll scrollbar-none"
            >
              {details.data?.images?.backdrops?.map((el, idx) => (
                <img
                  className="aspect-video max-[1025px]:w-52 w-72 min-[2024px]:w-96"
                  key={idx}
                  width={315}
                  src={`${details.baseUrl}${el.file_path}`}
                  draggable={false}
                />
              ))}
            </div>

            <div className="py-16 max-[513px]:py-12 min-[2048px]:py-24 flex w-full flex-col">
              <h6>트레일러 & 티저 영상</h6>
              <div
                ref={videoRef}
                className="flex cursor-grab py-4 max-[513px]:py-2 gap-4 rounded-2xl overflow-scroll scrollbar-none max-[1025px]:snap-x max-[1025px]:snap-mandatory"
              >
                {getYouTube &&
                  getYouTube?.map((el, idx) => (
                    <iframe
                      className="rounded-2xl max-[1025px]:w-full w-9/12 min-[2024px]:w-3/5 aspect-video max-[1025px]:snap-center"
                      key={idx}
                      width={490}
                      src={`https://www.youtube.com/embed/${el.key}`}
                      title="Teaser video"
                      draggable={false}
                    ></iframe>
                  ))}
              </div>

              {/* 도트 */}
              <div className="flex justify-center gap-6">
                {getYouTube &&
                  getYouTube?.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => choiceVideoHandle(idx)}
                      className={`w-4 aspect-square rounded-full cursor-pointer ${
                        active === idx ? "bg-white" : "bg-white/40"
                      }`}
                    ></button>
                  ))}
              </div>
            </div>

            <div className="flex w-full flex-col">
              <h6>출연진</h6>
              <div
                ref={castRef}
                className="flex overflow-x-auto cursor-grab [&.is-dragging]:cursor-grabbing text-nowrap scrollbar-none py-4 max-[513px]:py-2 gap-14 max-[513px]:gap-8 min-[2048px]:gap-20 text-base max-[1025px]:text-sm max-[513px]:text-xs"
              >
                {hasProfileImg?.map((el) => (
                  <div className="flex" key={el.id}>
                    <img
                      className="aspect-[2/3] min-w-32 max-[1025px]:min-w-24 max-[513px]:min-w-14 min-[2024px]:min-w-40 rounded-4xl "
                      height={120}
                      src={`${details.baseUrl}${el.profile_path}`}
                      alt="cast profile image"
                      draggable={false}
                    />
                    <div className="p-2 flex flex-col justify-center select-none">
                      <p className="">{el.character}</p>
                      <p className="text-gray-400 text-sm max-[1025px]:text-xs max-[513px]:text-[10px]">
                        {el.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </article>
      )}
    </section>
  );
});
