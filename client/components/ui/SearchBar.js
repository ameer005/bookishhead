import { useState, useEffect, useRef } from "react";
import { useFetchBooks } from "../../hooks/api/book/useBook";
import useStore from "../../store/useStore";
import { MdOutlineClose } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import SearchResultBox from "./SearchResultBox";

const SearchBar = () => {
  const setModalState = useStore((state) => state.setModalState);
  const showSearchResultBox = useStore((state) => state.showSearchResultBox);
  const [searchValue, setSearchValue] = useState("");
  const searchBarRef = useRef();
  const { data, isSuccess, isLoading } = useFetchBooks({
    title: searchValue || "afjkadjkfjdjf",
    limit: 8,
  });
  const searchResults = data?.data.books;

  useEffect(() => {
    if (searchValue) {
      setModalState({ showSearchResultBox: true });
    } else {
      setModalState({ showSearchResultBox: false });
    }
  }, [searchValue]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!searchBarRef?.current?.contains(e.target)) {
        setModalState({ showSearchResultBox: false });
      }
    });
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className="" ref={searchBarRef}>
      <label
        onClick={() => {
          searchValue && setModalState({ showSearchResultBox: true });
        }}
        className="relative md:fixed md:left-0 md:w-full md:top-0 md:h-[4rem] md:z-50 md:flex md:items-center md:bg-colorWhite"
      >
        <input
          className="w-[25rem] xl:w-[20rem] md:px-6 md:text-base md:w-full md:rounded-none md:border-none placeholder:text-colorGray text-sm font-medium px-2 py-[6px] bg-transparent border border-colorGray/50  outline-none rounded-md ut-animation"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <MdSearch className="h-6 w-6  absolute top-[50%] md:hidden right-2 -translate-y-[50%] text-colorGray/70" />
        <button
          onClick={() => setModalState({ showMobileSearch: false })}
          className="hidden md:block "
        >
          <MdOutlineClose className="h-7 w-7  absolute top-[50%] right-2 -translate-y-[50%] text-colorGray/70" />
        </button>
        {showSearchResultBox && (
          <SearchResultBox
            isLoading={isLoading}
            isSuccess={isSuccess}
            searchResults={searchResults}
          />
        )}
      </label>
    </form>
  );
};

export default SearchBar;
