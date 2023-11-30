import axios from "axios";
import { BASE_URL } from ".";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const apiVisitor = axios.create({
  baseURL: `${BASE_URL}/visitor`,
});

apiVisitor.interceptors.request.use(
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

apiVisitor.interceptors.response.use(
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

export const viewVisitor = async (venueId, page = 1) => {
  return await apiVisitor.get(`/${venueId}?page=${page}`);
};
