import api from "../../../api/api";

export const fetchBooks = () => {
  return api.get("/books");
};
