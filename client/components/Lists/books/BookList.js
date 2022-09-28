import Link from "next/link";
import Item from "./Item";

const BookList = ({ isSuccess, isLoading, data }) => {
  const renderBookList = () => {
    if (!isSuccess) return;

    return data?.map((book) => {
      return <Item key={book._id} data={book} />;
    });
    1;
  };
  return (
    <div className="grid grid-cols-8 gap-y-8">
      {renderBookList()?.slice(0, 16)}
    </div>
  );
};

export default BookList;
