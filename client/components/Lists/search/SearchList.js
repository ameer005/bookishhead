import SearchItem from "./SearchItem";

const SearchList = ({ data }) => {
  const renderBooks = () => {
    return data.map((book) => {
      return <SearchItem key={book._id} data={book} />;
    });
  };
  return <div className="flex flex-col gap-2">{renderBooks()}</div>;
};

export default SearchList;
