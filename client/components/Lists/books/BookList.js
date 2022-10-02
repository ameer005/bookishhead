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
    <div className="grid grid-cols-5 gap-x-10 ">
      {renderBookList()?.slice(0, 5)}
    </div>
  );
};

export default BookList;
