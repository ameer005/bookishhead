import { useRouter } from "next/router";
import { useFetchBook } from "../../../hooks/api/book/useBook";

import { BsFillStarFill } from "react-icons/bs";

import ReadMore from "../../../components/ui/ReadMore";

const BookDetails = () => {
  const router = useRouter();
  const {
    data: bookData,
    isSuccess: bookSuccess,
    isLoading: bookLoading,
  } = useFetchBook(router.query.id);
  const book = bookData?.data.book;

  console.log(book);

  const renderGenres = () => {
    return book?.genres.map((genre) => {
      return (
        <div className=" px-3 py-1 font-semibold text-xs  rounded-full border border-colorPrimary text-center">
          {genre.name}
        </div>
      );
    });
  };

  if (!bookSuccess) return;

  return (
    <section className="px-24">
      <div className="flex gap-6">
        {/* top right */}
        <div className="shrink-0">
          <div className="h-72 mb-2">
            <img
              className="object-contain h-full w-full"
              src={book?.coverImg}
              alt={book?.title}
            />
          </div>
          <div>button</div>
        </div>

        {/* Top left */}
        <div>
          <div className="mb-2">
            <h3 className="font-calson font-bold text-xl">{book?.title}</h3>
            <p className="font-medium text-colorSecondary3">{`by ${book?.author}`}</p>
          </div>
          <div className="mb-3 flex gap-1 items-center">
            <BsFillStarFill className="text-yellow-500 text-xl" />
            <div className="flex gap-3">
              <div className="font-semibold text-colorSecondary3">
                <span className="text-colorBlack font-bold">
                  {book?.ratingsAverage.toFixed(1)}
                </span>
                /<span>10</span>
              </div>
              <div className="font-medium text-colorSecondary3">{`${book?.ratingsQuantity} ratings`}</div>
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">{renderGenres()}</div>
          <ReadMore limit={520} text={book?.summary} />
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
