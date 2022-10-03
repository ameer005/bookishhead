import api from "../../../api/api";

export const fetchReviews = ({ queryKey }) => {
  return api.get(`/books/${queryKey[1].book}/reviews`);
};

export const fetchUserReview = ({ queryKey }) => {
  return api.get(`/books/${queryKey[1]}/reviews/user`);
};

export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);
};

export const addReview = (payload) => {
  return api.post(`/books/${payload.bookId}/reviews`, payload.data);
};

export const updateReview = (payload) => {
  return api.patch(`/reviews/${payload.reviewId}`, payload.data);
};
