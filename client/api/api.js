import axios from "axios";

let token = localStorage.getItem("token");

let URL = "https://kanban-tasks-manager.vercel.app/api/v1";

if (process.env.NODE_ENV !== "production") {
  URL = "http://127.0.0.1:5000/api/v1";
}

const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use(
  (config) => {
    token = localStorage.getItem("token");
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
