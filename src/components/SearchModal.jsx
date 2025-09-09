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
          className=" bg-black flex flex-col w-3/5 gap-4 pb-4 pt-24 max-[1025px]:pt-16 max-[1025px]:w-full px-7 max-[513px]:px-4 rounded-b-3xl"
        >
          {searchData?.data?.results
            .filter((el) => el.title.match(reg))
            .map(
              (el) =>
                el && (
                  <Link key={el.id} onClick={onClose} to={`/main/${el.id}`}>
                    <div className="flex gap-4 max-[513px]:gap-2 overflow-y-scroll overflow-x-hidden scrollbar-none hover:scale-105 active:scale-105 duration-300">
                      <img
                        className="aspect-video h-24 max-[513px]:h-16 max-[1025px]:h-20 rounded-xl"
                        src={`${searchData?.baseUrl}${el.backdrop_path}`}
                        alt="movie image"
                      />
                      <div className="flex flex-col gap-1 py-1">
                        <p className="text-sm max-[513px]:text-xs text-gray-500 line-clamp-1">
                          {el.original_title}
                        </p>
                        <h2 className="text-white max-[513px]:text-sm pr-2 text-pretty">
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
