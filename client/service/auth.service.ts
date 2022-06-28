import axios from "axios";
import localStorageService from "./localStorage.service";
import { getKey } from "../utils/firebase.utils";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: getKey(),
  },
});

const authService = {
  refresh: async (): Promise<any> => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};
export default authService;
