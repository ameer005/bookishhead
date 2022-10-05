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
    <div className="grid grid-cols-5 gap-x-10 gap-y-6 ">{renderSkeleton()}</div>
  );
};

export default BookCardSkeletonList;
