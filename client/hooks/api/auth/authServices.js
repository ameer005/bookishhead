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
