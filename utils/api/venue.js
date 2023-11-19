import axios from "axios";
import { BASE_URL } from ".";
import Cookies from "universal-cookie";
import { data } from "autoprefixer";

const cookies = new Cookies(null, { path: "/" });

const apiVenue = axios.create({
  baseURL: `${BASE_URL}/venue`,
});

apiVenue.interceptors.request.use(
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

apiVenue.interceptors.response.use(
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

export const listAllVenue = async () => {
  return await apiVenue.get("/");
};

export const apiAddVenue = async (data) => {
  return await apiVenue.post("/add", data)
}
