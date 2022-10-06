import api from "../../../api/api";

export const signup = (userData) => {
  return api.post("/users/signup", userData);
};

export const activateAccount = (userData) => {
  return api.post("/users/activateAccount", userData);
};

export const login = (userDate) => {
  return api.post("/users/login", userDate);
};

export const FetchMyInfo = () => {
  return api.get("/users/myInfo");
};

export const updateMyInfo = (userData) => {
  return api.patch("/users/updateMe", userData);
};

export const changePassword = (userData) => {
  return api.patch("/users/changePassword", userData);
};
