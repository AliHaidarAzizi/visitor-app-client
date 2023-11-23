import axios from "axios";
import { BASE_URL } from ".";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const apiUser = axios.create({
  baseURL: `${BASE_URL}/user`,
});

apiUser.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiUser.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      cookies.remove("token");
      // this is .js file not react. use window
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export const viewUser = async () => {
  return await apiUser.get("/");
};
