import axios from "axios";

const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    // If VITE_API_URL is missing, default to backend URL or localhost
    return "http://localhost:5001/api"; 
  }
  return url.replace(/\/$/, "") + "/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
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
