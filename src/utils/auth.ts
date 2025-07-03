import { HOME } from "@/constants/path";

const getToken = () => {
  if (typeof window !== "undefined") {
    if (window.document.cookie.includes("token=")) {
      return window.document.cookie.split("=")[1];
    }
  }
};

const isAuthenticated = () => {
  return getToken() ? true : false;
};

const logOut = () => {
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  });

  window.location.href = HOME;
};

const Auth = {
  getToken,
  isAuthenticated,
  logOut,
};

export default Auth;