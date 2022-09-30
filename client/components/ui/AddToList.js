import { useState, useEffect } from "react";
import {
  useAddUserBook,
  useUpdateUserBookStatus,
  useFetchUserBook,
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

  let book = userBook?.data.listItem;

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

  useEffect(() => {
    setSelectStatusText(book?.status);
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

  if (!book) {
    return (
      <button
        disabled={addUserBookLoading || userBooksLoadin}
        onClick={() => addUserBook({ bookId })}
        className="bg-colorPrimary py-2 text-center text-colorWhite font-medium rounded-md  ut-animation hover:brightness-90 w-full"
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
      <SelectField
        isSelectOpen={isSelectOpen}
        setSelectOpen={setSelectOpen}
        selectText={selectStatusText}
        list={selectFieldList}
        isLoading={updateUserBookLoading}
      />
    );
  }
};

export default AddToList;
