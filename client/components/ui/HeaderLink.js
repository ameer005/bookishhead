import Link from "next/link";
import React from "react";

const HeaderLink = ({ link, heading }) => {
  return (
    <div className="flex items-center justify-between text-colorSecondary3 mb-6">
      <Link href={link}>
        <a className="font-semibold text-base hover:text-colorBlack ut-animation">
          {heading}
        </a>
      </Link>
      <Link href={link}>
        <a className="font-semibold text-xs hover:text-colorBlack ut-animation">
          View All
        </a>
      </Link>
    </div>
  );
};

export default HeaderLink;
