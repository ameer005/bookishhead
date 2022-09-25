import api from "../../../api/api";

export const fetchBooks = () => {
  return api.get("/books");
};

export const fetchBook = ({ queryKey }) => {
  return api.get(`/books/${queryKey[1]}`);
};
