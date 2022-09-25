import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "./bookServices";

export const useFetchBooks = () => {
  return useQuery(["books"], fetchBooks);
};
