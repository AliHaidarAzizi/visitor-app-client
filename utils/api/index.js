import axios from "axios";
import Cookies from "universal-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL);

const cookies = new Cookies(null, { path: "/" });
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    // check if there any token in the response insert it in the cookies
    const token = response.data.token;
    // console.log(">>>>>>", response);
    if (token) {
      cookies.set("token", token);
    }
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const apiRegister = async (data) => {
  return await api.post("/auth/register", data);
};

export const apiLogin = async (data) => {
  return await api.post("/auth/login", data);
};
