import Item from "./Item";
import BookCardSkeleton from "../../skeletons/BookCardSkeleton";

const BookList = ({ isSuccess, data }) => {
  const renderBookList = () => {
    if (!isSuccess) return;

    return data?.map((book) => {
      return <Item key={book._id} data={book} />;
    });
    1;
  };

  return (
    <div className="grid grid-cols-5 justify-items-center 2xl:grid-cols-4 lg:grid-cols-3 xs:grid-cols-2  gap-x-10  gap-y-6">
      {renderBookList()}
    </div>
  );
};

export default BookList;
