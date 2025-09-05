import { Skeleton } from "./Skeleton";

export const MovieCardSkeleton = ({ className = "" }) => {
  return (
    <article className="relative w-full h-full flex px-2 py-2 justify-center items-center">
      <Skeleton
        className={`relative flex px-2 py-2 aspect-2/3 rounded-3xl ${className} `}
      ></Skeleton>
    </article>
  );
};
