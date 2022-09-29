import { useQuery } from "@tanstack/react-query";
import { fetchBook, fetchBooks } from "./bookServices";

export const useFetchBooks = (params) => {
  return useQuery(["books", params], fetchBooks);
};

export const useFetchBook = (bookId) => {
  return useQuery(["books", bookId], fetchBook);
};
