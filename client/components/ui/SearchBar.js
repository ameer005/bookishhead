import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <form className="w-full max-w-[25rem]">
      <label className="relative">
        <input
          className="w-full px-2 py-[6px] border-2 border-colorSecondary focus:border-colorPrimary outline-none rounded-md ut-animation"
          type="text"
        />
        <MdSearch className="h-6 w-6 absolute top-[50%] right-4 -translate-y-[50%] text-colorSecondary2" />
      </label>
    </form>
  );
};

export default SearchBar;
