const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

const getLocalStorage = (item) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(item);
  }
  return null;
};
const setLocalStorage = (item, value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(item, value);
  }
};

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  setLocalStorage(USERID_KEY, localId);
  setLocalStorage(TOKEN_KEY, idToken);
  setLocalStorage(REFRESH_KEY, refreshToken);
  setLocalStorage(EXPIRES_KEY, String(expiresDate));
}
export function getAccessToken() {
  return getLocalStorage(TOKEN_KEY);
}
export function getRefreshToken() {
  return getLocalStorage(REFRESH_KEY);
}
export function removeAuthData() {
  window.localStorage.removeItem(USERID_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
  window.localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
  return getLocalStorage(EXPIRES_KEY);
}
export function getUserId() {
  return getLocalStorage(USERID_KEY);
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};
export default localStorageService;
