import Head from "next/head";
import Link from "next/link";
import { useFetchBook } from "../../../hooks/api/book/useBook";
import { useFetchUserReview } from "../../../hooks/api/reviews/useReviews";
import useStore from "../../../store/useStore";

import { BsFillStarFill, BsStar } from "react-icons/bs";

import ReadMore from "../../../components/ui/ReadMore";
import AddToList from "../../../components/ui/AddToList";
import Ratings from "../../../components/modals/Ratings";
import ReviewsModal from "../../../components/modals/ReviewsModal";
import ReviewsList from "../../../components/Lists/reviews/ReviewsList";

const BookDetails = ({ query }) => {
  const showRatingsModal = useStore((state) => state.showRatingsModal);
  const showReviewModal = useStore((state) => state.showReviewModal);
  const setModalState = useStore((state) => state.setModalState);
  const bookId = query.id;

  const {
    data: bookData,
    isSuccess: bookSuccess,
    isLoading: bookLoading,
  } = useFetchBook(bookId);

  const {
    data: userReviewData,
    isSuccess: userReviewSuccess,
    isLoading: userReviewLoading,
    refetch: userReviewRefect,
  } = useFetchUserReview(bookId);

  const renderGenres = () => {
    return bookData?.data.book.genres.map((genre, index) => {
      return (
        <Link key={index} href={`/books/genre/${genre.name}`}>
          <a className="text-gray-500 px-3 py-1 font-semibold text-xs rounded-full border bg-gray-300/40 text-center cursor-pointer hover:bg-colorPrimary hover:text-colorWhite ut-animation">
            {genre.name}
          </a>
        </Link>
      );
    });
  };

  if (!bookSuccess) return;

  return (
    <>
      <Head>
        <title>{`${bookData?.data.book.title} | BookisHead`}</title>
      </Head>
      <section className="px-24 2xl:px-14 xl:px-8 md:px-2 sm:px-0 mb-10">
        <div className="flex xl:flex-col gap-6">
          {/* top right */}
          <div className="shrink-0 xl:flex xl:flex-col xl:items-center">
            <div className="h-72 2xl:h-60 mb-2">
              <img
                className="object-contain h-full w-full rounded-md"
                src={bookData?.data.book.coverImg}
                alt={bookData?.data.book.title}
              />
            </div>

            <div className="xl:w-[12rem]">
              <AddToList bookId={bookId} />
            </div>
          </div>

          {/* Top left */}
          <div>
            <div className="mb-2 xl:text-center">
              <h3 className="font-calson font-bold text-xl">
                {bookData?.data.book?.title}
              </h3>
              <div className="font-medium text-gray-600">
                <span>by</span>
                <span className="ml-1">{bookData?.data.book.author}</span>
              </div>
            </div>
            <div className="mb-3 flex xl:justify-center gap-3 items-center xl:mb-5">
              <div className="flex items-center gap-1">
                <BsFillStarFill className="text-yellow-500 text-xl" />
                <div className="font-semibold text-colorSecondary3">
                  <span className="text-colorBlack font-bold">
                    {bookData?.data.book.ratingsAverage !== 10
                      ? bookData?.data.book.ratingsAverage.toFixed(1)
                      : bookData?.data.book.ratingsAverage}
                  </span>
                  /<span>10</span>
                </div>
              </div>
              <div className="font-medium text-gray-500">{`${bookData?.data.book.ratingsQuantity} ratings`}</div>

              {/* give ratings button */}
              <button
                onClick={() => setModalState({ showRatingsModal: true })}
                className="flex gap-1 items-center"
              >
                {userReviewSuccess ? (
                  <BsFillStarFill className=" text-lg text-blue-500" />
                ) : (
                  <BsStar className=" text-lg text-yellow-500" />
                )}

                <div
                  className={
                    "text-gray-500 font-medium hover:text-colorPrimaryLight3 ut-animation"
                  }
                >
                  {userReviewSuccess
                    ? userReviewData?.data.review.rating !== 10
                      ? userReviewData?.data.review.rating.toFixed(1)
                      : userReviewData?.data.review.rating
                    : "Rate"}
                </div>
              </button>
            </div>
            <div className="flex xl:justify-center gap-2 mb-3 flex-wrap">
              {renderGenres()}
            </div>
            <ReadMore limit={520} text={bookData?.data.book.summary} />
          </div>
        </div>
      </section>

      {/* reviews and recommendation section */}
      <section className="flex gap-4 px-24 xl:px-8 md:px-2 sm:px-0">
        <div className=" w-full">
          {/* header */}
          <div className="flex item-center justify-between mb-8">
            <h3 className=" font-bold text-base uppercase tracking-wider text-gray-500">
              Reviews
            </h3>
            <button
              onClick={() => setModalState({ showReviewModal: true })}
              className="text-colorPrimary font-medium text-sm hover:text-colorPrimaryLight2 ut-animation"
            >
              {userReviewData?.data.review.review && userReviewSuccess
                ? "Edit your review"
                : "Create review"}
            </button>
          </div>

          {/* Reviews box */}
          <ReviewsList bookId={bookId} />
        </div>
        {/* <div className="w-[18rem] 2xl:w-0"></div> */}
      </section>

      {/* modals */}
      {showRatingsModal && (
        <Ratings
          userRatings={userReviewSuccess && userReviewData?.data.review}
          bookId={bookId}
        />
      )}
      {showReviewModal && (
        <ReviewsModal
          userReview={userReviewSuccess && userReviewData?.data.review}
          bookId={bookId}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;
  return { props: { query } };
};

export default BookDetails;
