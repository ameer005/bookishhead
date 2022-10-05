import api from "../../../api/api";

export const fetchBooks = ({ queryKey }) => {
  return api.get("/books", {
    params: queryKey[1],
  });
};

export const fetchBook = ({ queryKey }) => {
  return api.get(`/books/${queryKey[1]}`);
};

export const fetchInfiniteBooks = ({ queryKey, pageParam = 1 }) => {
  return api.get(`/books?page=${pageParam}`, {
    params: queryKey[1],
  });
};
