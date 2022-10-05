import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useFetchUserBooks } from "../../hooks/api/userBooks/useUserBooks";
import useStore from "../../store/useStore";

import UserBooksList from "../../components/Lists/userBooksList/UserBooksList";

const ListPage = () => {
  const listOption = useStore((state) => state.listOption);
  const setOption = useStore((state) => state.setOption);
  const {
    data: userBooks,
    isLoading: userBooksLoading,
    isSuccess: userBooksSuccess,
  } = useFetchUserBooks();

  const completed = userBooks?.data.booksList.filter(
    (book) => book.status === "Completed"
  );
  const reading = userBooks?.data.booksList.filter(
    (book) => book.status === "Reading"
  );
  const plan = userBooks?.data.booksList.filter(
    (book) => book.status === "Plan to read"
  );

  const renderStatus = () => {
    const status = ["Completed", "Reading", "Plan To Read"];

    return status.map((item, index) => {
      return (
        <button
          key={index}
          onClick={() => setOption({ listOption: item.toLowerCase() })}
          className={`font-bold  pb-2  ${
            listOption === item.toLocaleLowerCase()
              ? "text-colorPrimaryLight"
              : "text-gray-400"
          }`}
        >
          {item}
        </button>
      );
    });
  };

  return (
    <section className="px-32">
      {/* listOption selector header */}
      <div className=" flex justify-center gap-8  mb-8">{renderStatus()}</div>

      {/* Rendered Settings */}
      <div>
        {userBooksLoading && (
          <div className="flex justify-center">
            <BeatLoader size={10} color={"rgb(255, 137, 131)"} />
          </div>
        )}

        {listOption === "completed" && <UserBooksList data={completed} />}
        {listOption === "reading" && <UserBooksList data={reading} />}
        {listOption === "plan to read" && <UserBooksList data={plan} />}
      </div>
    </section>
  );
};

export default ListPage;
