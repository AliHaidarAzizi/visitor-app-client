import axios from "axios";
import { BASE_URL } from ".";

const apiAddVisitor = axios.create({
  baseURL: `${BASE_URL}/visitor`,
});

export const addVisitor = async (data) => {
  return await apiAddVisitor.post(`/${data.venueId}`, data);
};
