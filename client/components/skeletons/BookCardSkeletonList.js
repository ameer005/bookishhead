import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";

const BookCardSkeletonList = ({ skeletonCount }) => {
  const renderSkeleton = () => {
    return Array(skeletonCount)
      .fill(null)
      .map((Item, index) => {
        return <BookCardSkeleton key={index} />;
      });
  };
  return (
    <div className="grid grid-cols-5 justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-x-10 xs:gap-x-3  gap-y-6">
      {renderSkeleton()}
    </div>
  );
};

export default BookCardSkeletonList;
