import axios from "axios";

const request = axios.create({
  baseURL: "https://alert-jobey-maro-asam-6a7c7557.koyeb.app/",
  withCredentials: true,
});

export default request;
