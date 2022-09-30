import useStore from "../../../store/useStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserReview,
  deleteReview,
  addReview,
  updateReview,
} from "./reviewsServices";

export const useFetchUserReview = (bookId) => {
  return useQuery(["reviews", bookId], fetchUserReview, {
    retry: false,
  });
};

export const useDeleteUserReview = () => {
  const queryClient = useQueryClient();
  const setRatingsModalState = useStore((state) => state.setRatingsModalState);

  return useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      setRatingsModalState(false);
    },
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const setRatingsModalState = useStore((state) => state.setRatingsModalState);

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setRatingsModalState(false);
    },
  });
};

export const useUpdateReview = (bookId) => {
  const queryClient = useQueryClient();
  const setRatingsModalState = useStore((state) => state.setRatingsModalState);

  return useMutation(updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("books");
      setRatingsModalState(false);
    },
  });
};
