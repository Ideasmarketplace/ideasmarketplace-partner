import axios from "axios";
import { csrfStore } from "./global-state-store";

export const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const CSRF_HEADER_NAME = "x-xsrf-token";
const PROTECTED_METHODS = ["post", "put", "delete", "patch"];

const Api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const csrfToken = csrfStore.getToken();
    const method = config.method ? config.method.toLowerCase() : ''
    if (csrfToken && PROTECTED_METHODS.includes(method)) {
        config.headers[CSRF_HEADER_NAME] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 403) {
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
         window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default Api;