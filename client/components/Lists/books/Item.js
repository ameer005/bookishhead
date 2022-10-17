import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Item = ({ data }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/books/${data._id}`)}
      className="w-[12.5rem] 2xl:w-[11.5rem] md:w-[11rem] sm:w-full  cursor-pointer py-5 px-4 flex flex-col items-center hover:bg-colorPrimaryLight3/20 ut-animation light-shadow rounded-md"
    >
      <div className="mb-3 h-44 w-[7.5rem]">
        <img
          className="object-containl w-full h-full rounded-md z-0"
          src={data.coverImg}
        ></img>
      </div>
      <div className="text-center">
        <div className="font-bold mb-1 w-[18ch] overflow-hidden whitespace-nowrap">
          {data.title}
        </div>
        <div className="font-bold text-xs">
          <span className="text-colorGray/50">by</span>
          <span className="text-colorPrimary ml-1 ">{data.author}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
