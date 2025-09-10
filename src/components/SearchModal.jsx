import { getRegExp } from "korean-regexp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useDebounce } from "../hooks/useDebounce";
import { fetchSearch } from "../store/thunk";

export const SearchModal = ({ onClose, query }) => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.searchList);
  const reg = getRegExp(query);
  const debounceQuery = useDebounce(query, 800);

  useEffect(() => {
    dispatch(fetchSearch(query));
  }, [dispatch, query, debounceQuery]);

  return (
    <section className="flex flex-col items-end text-base h-full">
      {/* 리스트 영역 */}
      {searchData?.data?.results && (
        <article
          onClick={(e) => e.stopPropagation()}
          className=" bg-black flex flex-col w-1/2 gap-4 min-[2048px]:gap-8 pb-4 pt-24 min-[2048px]:pt-40 max-[1025px]:pt-16 max-[1025px]:w-full min-[2048px]:w-1/3 px-7 max-[513px]:px-4 rounded-b-3xl"
        >
          {searchData?.data?.results
            .filter((el) => el.title.match(reg))
            .map(
              (el) =>
                el && (
                  <Link key={el.id} onClick={onClose} to={`/main/${el.id}`}>
                    <div className="flex gap-4 min-[2048px]:gap-8 max-[513px]:gap-2 overflow-y-scroll overflow-x-hidden scrollbar-none hover:scale-105 active:scale-105 duration-300">
                      <img
                        className="aspect-video h-24 max-[513px]:h-16 max-[1025px]:h-20 min-[2048px]:h-40 rounded-xl"
                        src={`${searchData?.baseUrl}${el.backdrop_path}`}
                        alt="movie image"
                      />
                      <div className="flex flex-col gap-1 py-1 min-[2048px]:gap-3 min-[2048px]:py-4">
                        <p className="text-sm max-[513px]:text-xs min-[2048px]:text-xl text-gray-500 line-clamp-1">
                          {el.original_title}
                        </p>
                        <h2 className="text-white max-[513px]:text-sm pr-2 min-[2048px]:text-2xl text-pretty">
                          {el.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                )
            )}
        </article>
      )}
    </section>
  );
};
