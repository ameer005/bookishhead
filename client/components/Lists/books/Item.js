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
      <div className="mb-2">
        <img className="object-fill h-44 " src={data.coverImg}></img>
      </div>
      <div className="h-[2rem] font-calson font-semibold text-center text-xs max-w-[16ch] overflow-hidden">
        {data.title}
      </div>
    </div>
  );
};

export default Item;
