import ReviewItem from "./ReviewItem";
import { useFetchReviews } from "../../../hooks/api/reviews/useReviews";

const ReviewsList = ({ bookId }) => {
  const {
    data: reviewsData,
    isSuccess: reviewsSuccess,
    isLoading: reviewsLoading,
  } = useFetchReviews(bookId);

  const reviewsWithText = reviewsData?.data.reviews.filter(
    (review) => review.review
  );

  const renderReviews = () => {
    if (!reviewsSuccess) return;
    return reviewsWithText.map((review) => {
      if (!review.review) return;
      return <ReviewItem key={review._id} data={review} />;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6"> {renderReviews()}</div>
      {!reviewsWithText?.length && (
        <div className="flex justify-center">
          <div>No reviews</div>
        </div>
      )}
    </>
  );
};

export default ReviewsList;
