import api from "../../../api/api";

export const fetchBooks = ({ queryKey }) => {
  return api.get("/books", {
    params: queryKey[1],
  });
};

export const fetchBook = ({ queryKey }) => {
  return api.get(`/books/${queryKey[1]}`);
};
