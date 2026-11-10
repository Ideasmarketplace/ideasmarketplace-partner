import axios from "axios";
import { csrfStore } from "./global-state-store";

export const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const CSRF_HEADER_NAME = "x-xsrf-token";
const PROTECTED_METHODS = ["post", "put", "delete", "patch"];

const PUBLIC_PATHS = ["/", "/forgot-password", "/reset-password"];

// "/" must match exactly, or startsWith("/") would match every page
const isPublicPage = (pathname: string) =>
  PUBLIC_PATHS.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(p + "/"),
  );

// A 401 from these means "wrong credentials", not "session expired"
const AUTH_ENDPOINTS = ["/auth/login", "/auth/forgot-password", "/auth/reset-password"];


const Api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const csrfToken = csrfStore.getToken();
    const method = config.method ? config.method.toLowerCase() : "";
    if (csrfToken && PROTECTED_METHODS.includes(method)) {
      config.headers[CSRF_HEADER_NAME] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl: string = error.config?.url ?? "";

    if (
      status === 401 &&
      typeof window !== "undefined" &&
      !isPublicPage(window.location.pathname) &&
      !AUTH_ENDPOINTS.some((p) => requestUrl.includes(p))
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default Api;
