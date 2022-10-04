import UserBooksItem from "./UserBooksItem";

const userBooksList = ({ data }) => {
  const renderItems = () => {
    return data?.map((item) => {
      return <UserBooksItem key={item._id} data={item} />;
    });
  };
  return <div className="flex gap-x-5 gap-y-2 flex-wrap">{renderItems()}</div>;
};

export default userBooksList;
