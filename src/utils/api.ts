import axios from "axios";
import { parseCookies } from 'nookies'; 
import { jwtDecode } from "./helper";
import Auth from "./auth";


export const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Retrieve token from cookies
const getTokenFromCookies = () => {
  const cookies = parseCookies();
  return cookies['access_token']; // Ensure you're using the correct cookie name
};

const isTokenExpired = (token:string) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now; // Check if token is expired
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // If decoding fails, assume the token is expired
  }
};

Api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); 
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token has expired. Redirecting to login.");
        Auth.logOut(); 
        return Promise.reject(new Error("Token expired"));
      }
      console.log("Token being sent:", token); 
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      // Token is invalid or expired, handle the situation accordingly
      console.log("Token expired or unauthorized access. Redirecting to login.");
      Auth.logOut();
    }
    return Promise.reject(error);
  }
);

export default Api;