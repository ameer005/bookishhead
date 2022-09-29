import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import SearchList from "../Lists/search/SearchList";

const SearchResultBox = ({ isLoading, searchResults, isSuccess }) => {
  return (
    <div
      className={`flex flex-col p-3 absolute top-[125%] w-full scrollbar bg-colorWhite h-[15rem] rounded-md shadow-lg overflow-y-auto ${
        (isLoading || !searchResults?.length) && "items-center justify-center"
      }`}
    >
      {isLoading && <LoadingSpinner />}
      {!searchResults?.length && !isLoading && <div>No results found</div>}
      {isSuccess && searchResults.length > 0 && (
        <div className="self-start w-full">
          <SearchList data={searchResults} />
        </div>
      )}
    </div>
  );
};

export default SearchResultBox;
