import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Important for HTTP-only cookie handling
});

export default axiosInstance;
