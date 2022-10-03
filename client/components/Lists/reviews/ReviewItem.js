import React from "react";
import Avatar from "../../ui/Avatar";
import ReadMore from "../../ui/ReadMore";

const ReviewItem = ({ data }) => {
  return (
    <div className="flex gap-3 light-shadow px-5 py-4 rounded-md">
      {/* left side */}
      <div>
        <Avatar />
      </div>
      {/* right side */}
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <h3 className="font-medium">{data?.user.name}</h3>
          <div className="text-gray-500 flex">
            <div className={"font-bold  "}>
              {data?.rating !== 10 ? data?.rating.toFixed(1) : data?.rating}
            </div>
            {/* <span>/10</span> */}
          </div>
        </div>
        <div>
          <ReadMore limit={270} text={data?.review} />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
