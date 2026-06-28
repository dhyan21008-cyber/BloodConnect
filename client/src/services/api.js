import axios from "axios";

const API = axios.create({
  baseURL: " https://bloodconnect-backend-sa84.onrender.com",
});

export default API;