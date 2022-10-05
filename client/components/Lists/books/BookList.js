import Item from "./Item";
import BookCardSkeleton from "../../skeletons/BookCardSkeleton";

const BookList = ({ isSuccess, isLoading, data, skeletonCount }) => {
  const renderBookList = () => {
    if (!isSuccess) return;

    return data?.map((book) => {
      return <Item key={book._id} data={book} />;
    });
    1;
  };

  return (
    <div className="grid grid-cols-5 gap-x-10 gap-y-6 ">{renderBookList()}</div>
  );
};

export default BookList;
