import useStore from "../../../store/useStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserReview,
  deleteReview,
  addReview,
  updateReview,
  fetchReviews,
} from "./reviewsServices";

export const useFetchReviews = (bookId) => {
  return useQuery(["reviews", { book: bookId }], fetchReviews, {
    retry: false,
  });
};

export const useFetchUserReview = (bookId) => {
  return useQuery(["reviews", bookId], fetchUserReview, {
    retry: false,
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const setModalState = useStore((state) => state.setModalState);

  return useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setModalState({ showRatingsModal: false });
    },
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const setModalState = useStore((state) => state.setModalState);

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setModalState({ showRatingsModal: false, showReviewModal: false });
    },
  });
};

export const useUpdateReview = (bookId) => {
  const queryClient = useQueryClient();
  const setModalState = useStore((state) => state.setModalState);

  return useMutation(updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setModalState({ showRatingsModal: false, showReviewModal: false });
    },
  });
};
