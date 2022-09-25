import { useQuery } from "@tanstack/react-query";
import { fetchBook, fetchBooks } from "./bookServices";

export const useFetchBooks = () => {
  return useQuery(["books"], fetchBooks);
};

export const useFetchBook = (bookId) => {
  return useQuery(["books", bookId], fetchBook);
};
