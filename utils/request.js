import axios from "axios";

const request = axios.create({
  baseURL: "https://keraza-frontend.vercel.app",
  withCredentials: true,
});

export default request;
