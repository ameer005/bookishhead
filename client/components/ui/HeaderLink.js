import Link from "next/link";
import React from "react";

const HeaderLink = ({ link, heading }) => {
  return (
    <div className="flex items-center justify-between text-colorSecondary3 mb-4">
      <Link href={link}>
        <a className="text-sm sm:text-base font-bold uppercase  text-gray-500">
          {heading}
        </a>
      </Link>
      <Link href={link}>
        <a className="text-gray-500/60 font-semibold text-xs hover:text-colorPrimary ut-animation">
          View All
        </a>
      </Link>
    </div>
  );
};

export default HeaderLink;
