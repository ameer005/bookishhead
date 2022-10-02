import { useState, useEffect } from "react";
import {
  useDeleteUserReview,
  useAddReview,
  useUpdateReview,
} from "../../hooks/api/reviews/useReviews";

import ReactDom from "react-dom";
import useStore from "../../store/useStore";

import { BsFillStarFill } from "react-icons/bs";
import LoadingSpinner from "../ui/LoadingSpinner";

const Ratings = ({ userRatings, bookId }) => {
  const setRatingsModalState = useStore((state) => state.setRatingsModalState);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const {
    mutate: deleteRating,
    isSuccess: deleteRatingSuccess,
    isLoading: deleteRatingLoading,
  } = useDeleteUserReview(bookId);

  const {
    mutate: addRating,
    isSuccess: addRatingSuccess,
    isLoading: addRatingLoading,
  } = useAddReview();

  const {
    mutate: updateRating,
    isSuccess: updateRatingSuccess,
    isLoading: updateRatingLoading,
  } = useUpdateReview(bookId);

  useEffect(() => {
    if (userRatings) {
      setRating(userRatings.rating);
    }
  }, []);

  const renderStars = () => {
    return [...Array(10)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <label onClick={() => setRating(ratingValue)} key={index}>
          <input
            type={"radio"}
            name={"rating"}
            className="hidden"
            value={ratingValue}
          />
          <BsFillStarFill
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            className={`text-2xl  cursor-pointer ${
              ratingValue <= (hover || rating)
                ? "text-blue-400"
                : "text-gray-400"
            }`}
          />
        </label>
      );
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!rating) return;

    if (!userRatings) {
      addRating({
        bookId: bookId,
        data: {
          rating: rating,
        },
      });
    } else {
      updateRating({
        reviewId: userRatings._id,
        data: {
          rating: rating,
        },
      });
    }
  };

  return ReactDom.createPortal(
    <div
      onClick={() => setRatingsModalState(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorWhite text-colorNeutral w-full max-w-[30rem] px-7 py-6 md:px-5 rounded-sm relative"
      >
        {/* big Star */}
        <div className="absolute top-0 left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="relative flex justify-center items-center">
            <BsFillStarFill className="text-7xl text-blue-400" />
            <div className="absolute font-semibold text-colorWhite">
              {userRatings?.rating || "?"}
            </div>
          </div>
        </div>
        {/* Rating Form */}
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-4  items-center mt-8"
        >
          <h3 className="font-medium">Rate This</h3>
          <div className="flex gap-2 items-center mb-2">{renderStars()}</div>
          <div className="max-w-[20rem] w-full">
            <button className="w-full  py-2 bg-colorPrimary text-xs font-semibold text-colorWhite rounded-md hover:brightness-95 mb-2 ut-animation">
              {addRatingLoading || updateRatingLoading ? (
                <LoadingSpinner />
              ) : (
                "Submit"
              )}
            </button>
            {userRatings && (
              <button
                onClick={() => deleteRating(userRatings._id)}
                className="text-xs font-semibold text-colorSecondary3 py-2 hover:bg-blue-400/20 rounded-md w-full ut-animation"
                type="button"
              >
                {deleteRatingLoading ? <LoadingSpinner /> : "Remove rating"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-ratings")
  );
};

export default Ratings;