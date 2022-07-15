import axios from "axios";
import config from "../utils/config.json";
const http = axios.create({
  baseURL: config.backendPath,
});
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
