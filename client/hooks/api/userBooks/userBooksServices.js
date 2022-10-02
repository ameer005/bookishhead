import api from "../../../api/api";

export const fetchUsersBooks = () => {
  return api.get("/users/list");
};

export const fetchUserBook = ({ queryKey }) => {
  return api.get(`/users/list/${queryKey[1]}`);
};

export const addUserBook = (listData) => {
  return api.post("/users/list", listData);
};

export const updateUserBookStatus = (payload) => {
  return api.patch(`/users/list/${payload.bookId}`, payload.data);
};

export const deelteUserBook = (bookId) => {
  return api.delete(`/users/list/${bookId}`);
};
