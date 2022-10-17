import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookCardSkeleton = () => {
  return (
    <div className="w-[12.5rem] 2xl:w-[11.5rem] md:w-[11rem] sm:w-[10rem] xs:w-[11rem]  py-5 px-4 flex flex-col items-center light-shadow rounded-md">
      <div className="mb-3 h-44 w-[7.5rem]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center ">
        <div className="w-[18ch]">
          <Skeleton />
        </div>
        <div className="w-[16ch]">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
