import { useState, useEffect, useRef } from "react";
import { useFetchBooks } from "../../hooks/api/book/useBook";
import useStore from "../../store/useStore";

import { MdSearch } from "react-icons/md";
import SearchResultBox from "./SearchResultBox";

const SearchBar = () => {
  const showSearchResultBox = useStore((state) => state.showSearchResultBox);
  const setResultBoxState = useStore((state) => state.setResultBoxState);
  const [searchValue, setSearchValue] = useState("");
  const searchBarRef = useRef();
  const { data, isSuccess, isLoading } = useFetchBooks({
    title: searchValue || "afjkadjkfjdjf",
    limit: 8,
  });
  const searchResults = data?.data.books;

  useEffect(() => {
    if (searchValue) {
      setResultBoxState(true);
    } else {
      setResultBoxState(false);
    }
  }, [searchValue]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!searchBarRef?.current?.contains(e.target)) {
        setResultBoxState(false);
      }
    });
  });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-[25rem] relative"
      ref={searchBarRef}
    >
      <label
        onClick={() => {
          searchValue && setResultBoxState(true);
        }}
        className="relative"
      >
        <input
          className="w-full px-2 py-[6px] border border-colorSecondary  focus:border-colorPrimary outline-none rounded-md ut-animation"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <MdSearch className="h-6 w-6 absolute top-[50%] right-4 -translate-y-[50%] text-colorSecondary2" />
      </label>

      {showSearchResultBox && (
        <SearchResultBox
          isLoading={isLoading}
          isSuccess={isSuccess}
          searchResults={searchResults}
        />
      )}
    </form>
  );
};

export default SearchBar;
