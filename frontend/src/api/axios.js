import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized - redirect to login");
    }
    return Promise.reject(err);
  },
);

export default API;
