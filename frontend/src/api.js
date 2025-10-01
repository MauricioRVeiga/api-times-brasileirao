import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // seu backend
});

export default api;
