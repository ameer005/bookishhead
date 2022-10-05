import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchBook, fetchBooks, fetchInfiniteBooks } from "./bookServices";

export const useFetchBooks = (params) => {
  return useQuery(["books", params], fetchBooks);
};

export const useFetchBook = (bookId) => {
  return useQuery(["books", bookId], fetchBook);
};

export const useFetchBooksInfinite = (params) => {
  return useInfiniteQuery(["books", params], fetchInfiniteBooks, {
    getNextPageParam: (lastpage, pages) => {
      if (lastpage.data.page < lastpage.data.totalPages) {
        return lastpage.data.page + 1;
      }
      return false;
    },
  });
};
