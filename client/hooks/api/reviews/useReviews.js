import useStore from "../../../store/useStore";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setModalState({ showRatingsModal: false, showReviewModal: false });
    },
    onError: (error) => {
      console.log("yo", error);

      if (error.response.status === 401) {
        router.push("/login");
      }
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
