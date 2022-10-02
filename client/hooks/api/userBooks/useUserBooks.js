import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserBook,
  fetchUsersBooks,
  addUserBook,
  updateUserBookStatus,
  deelteUserBook,
} from "./userBooksServices";

export const useFetchUserBooks = () => {
  return useQuery(["userBooks"], fetchUsersBooks);
};

export const useFetchUserBook = (bookId) => {
  return useQuery(["userBooks", bookId], fetchUserBook, {
    retry: false,
  });
};

export const useAddUserBook = () => {
  const queryClient = useQueryClient();
  return useMutation(addUserBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("userBooks");
    },
  });
};

export const useUpdateUserBookStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserBookStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("userBooks");
    },
  });
};

export const useDeleteUserbook = () => {
  const queryClient = useQueryClient();
  return useMutation(deelteUserBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("userBooks");
    },
  });
};
