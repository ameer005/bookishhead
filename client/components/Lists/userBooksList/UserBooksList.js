import UserBooksItem from "./UserBooksItem";

const UserBooksList = ({ data }) => {
  const renderItems = () => {
    return data?.map((item) => {
      return <UserBooksItem key={item._id} data={item} />;
    });
  };
  return (
    <>
      <div className="flex gap-x-5 gap-y-2 justify-center flex-wrap">
        {renderItems()}
      </div>
    </>
  );
};

export default UserBooksList;
