import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Item = ({ data }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/books/${data._id}`)}
      className="cursor-pointer flex flex-col items-center hover:text-colorSecondary3 ut-animation"
    >
      <div className="mb-2 h-44 w-[7.5rem]">
        <img
          className="object-containl w-full  h-full"
          src={data.coverImg}
        ></img>
      </div>
      <div className="h-[2rem] font-calson font-semibold text-center text-xs max-w-[16ch] overflow-hidden">
        {data.title}
      </div>
    </div>
  );
};

export default Item;
