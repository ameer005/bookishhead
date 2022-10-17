import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import useStore from "../../store/useStore";
import {
  useAddReview,
  useUpdateReview,
} from "../../hooks/api/reviews/useReviews";

import { MdOutlineClose } from "react-icons/md";

import { BsFillStarFill } from "react-icons/bs";
import LoadingSpinner from "../ui/LoadingSpinner";

const ReviewsModal = ({ userReview, bookId }) => {
  const setModalState = useStore((state) => state.setModalState);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const {
    mutate: addReview,
    isSuccess: addReviewSuccess,
    isLoading: addReviewLoading,
  } = useAddReview();

  const {
    mutate: updateReview,
    isSuccess: updateReviewSuccess,
    isLoading: updateReviewLoading,
  } = useUpdateReview(bookId);

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setReviewText(userReview.review);
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
            className={`text-xl  cursor-pointer ${
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

    if (!rating || !reviewText) return;

    const formData = {
      rating,
      review: reviewText,
    };

    console.log(formData);

    if (userReview) {
      updateReview({
        reviewId: userReview._id,
        data: { ...formData },
      });
    } else {
      addReview({
        bookId: bookId,
        data: { ...formData },
      });
    }

    console.log(formData);
  };

  return ReactDom.createPortal(
    <div
      onClick={() => setModalState({ showReviewModal: false })}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorbg text-colorNeutral w-full max-w-[30rem] px-7 py-6 md:px-5 rounded-md relative"
      >
        <div
          onClick={() => setModalState({ showReviewModal: false })}
          className="absolute right-0 top-0 -translate-y-9"
        >
          <MdOutlineClose className="text-3xl text-colorWhite cursor-pointer" />
        </div>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <div className="font-medium text-sm mb-2 uppercase text-gray-700">
              Your Rating
            </div>
            <div className="flex gap-1">{renderStars()}</div>
          </div>
          <div>
            <div className="font-medium text-sm mb-2 uppercase text-gray-700">
              Your Review
            </div>
            <label>
              <textarea
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText}
                placeholder="Write your review here..."
                className="input h-32 resize-none"
              ></textarea>
            </label>
          </div>
          <button className="bg-colorPrimary py-2 text-sm text-center text-colorWhite font-medium rounded-md  ut-animation hover:brightness-90 w-full mt-3">
            {addReviewLoading || updateReviewLoading ? (
              <LoadingSpinner />
            ) : (
              "Submit"
            )}
          </button>
          {userReview?.review && (
            <div
              onClick={() =>
                updateReview({
                  reviewId: userReview._id,
                  data: { review: "" },
                })
              }
              className="text-center mt-3 text-xs font-medium text-gray-500 cursor-pointer hover:text-colorPrimary ut-animation"
            >
              {/* {updateReviewLoading ? <LoadingSpinner /> : "Remove review"} */}
              Remove review
            </div>
          )}
        </form>
      </div>
    </div>,
    document.getElementById("modal-ratings")
  );
};

export default ReviewsModal;
