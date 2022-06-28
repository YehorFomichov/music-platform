import axios from "axios";
import localStorageService from "./localStorage.service";
import { getKey } from "../utils/firebase.utils";
import authService from "./auth.service";

const http = axios.create({
  baseURL: "http://localhost:5000",
});
http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && Number(expiresDate) < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens({
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        expiresIn: data.expires_in,
        localId: data.user_id,
      });
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
