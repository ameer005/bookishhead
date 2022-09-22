import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <form className="w-full max-w-[30rem]">
      <label className="relative">
        <input
          className="w-full px-2 py-2 border border-colorSecondary outline-none rounded-md"
          type="text"
        />
        <MdSearch className="h-6 w-6 absolute top-[50%] right-4 -translate-y-[50%]" />
      </label>
    </form>
  );
};

export default SearchBar;
