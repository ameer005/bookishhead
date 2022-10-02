import { useState, useEffect } from "react";
import {
  useAddUserBook,
  useUpdateUserBookStatus,
  useFetchUserBook,
  useDeleteUserbook,
} from "../../hooks/api/userBooks/useUserBooks";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SelectField from "../form/SelectField";

const AddToList = ({ bookId }) => {
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [selectStatusText, setSelectStatusText] = useState("Select status");

  const {
    data: userBook,
    isSuccess: userBooksSuccess,
    isLoading: userBooksLoadin,
  } = useFetchUserBook(bookId);

  const {
    mutate: addUserBook,
    isSuccess: addUserBookSuccess,
    isLoading: addUserBookLoading,
  } = useAddUserBook();

  const {
    mutate: updateUserBook,
    isSuccess: updateUserBookSuccess,
    isLoading: updateUserBookLoading,
  } = useUpdateUserBookStatus();

  const {
    mutate: deleteUserBook,
    isSuccess: deleteUserBookSuccess,
    isLoading: deleteUserBookLoading,
  } = useDeleteUserbook();

  useEffect(() => {
    if (!userBooksSuccess) return;

    setSelectStatusText(userBook?.data.listItem.status);
  }, [userBooksSuccess, userBook]);

  const selectFieldList = () => {
    const list = [
      {
        name: "Reading",
        value: "Reading",
      },
      {
        name: "Plan to read",
        value: "plan to read",
      },
      {
        name: "Completed",
        value: "completed",
      },
    ];
    return list.map((item) => {
      return (
        <label
          onClick={(e) => {
            updateUserBook({
              bookId: bookId,
              data: {
                status: item.name,
              },
            });
            // setSelectStatusText(item.name);
            setSelectOpen(false);
          }}
          key={item.value}
          className=" px-3 w-full cursor-pointer transition-all text-colorSecondary3 hover:text-colorPrimary font-medium duration-200 text-sm hover:text-[15px]"
        >
          <input
            className="hidden"
            type="radio"
            value={item.value}
            name="dropdown"
          />
          <span className="">{item.name}</span>
        </label>
      );
    });
  };

  if (!userBooksSuccess) {
    return (
      <button
        disabled={addUserBookLoading || userBooksLoadin}
        onClick={() => addUserBook({ bookId })}
        className="bg-colorPrimary py-2 text-center text-colorWhite font-medium rounded-md  ut-animation hover:brightness-90 w-full red-shadow"
      >
        {addUserBookLoading || userBooksLoadin ? (
          <LoadingSpinner />
        ) : (
          "Add To List"
        )}
      </button>
    );
  } else {
    return (
      <div>
        <SelectField
          isSelectOpen={isSelectOpen}
          setSelectOpen={setSelectOpen}
          selectText={selectStatusText}
          list={selectFieldList}
          isLoading={updateUserBookLoading}
        />

        <div
          onClick={() => deleteUserBook(userBook?.data.listItem._id)}
          className="text-center mt-2 text-xs font-medium text-gray-500 cursor-pointer hover:text-colorPrimary ut-animation"
        >
          {deleteUserBookLoading ? <LoadingSpinner /> : "Remove from list"}
        </div>
      </div>
    );
  }
};

export default AddToList;
