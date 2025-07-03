"use client";

import { HOME, LOGIN } from "@/constants/path";
import { UserContext } from "@/hooks/use-user";
import Api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

export interface UserData {
  _id: string;
  email: string;
  companyName: string;
  industry: string;
  representativeName: string;
  role: string;
  phoneNumber: string;
  communityDescription: string;
  communitySize: string;
  website: string;
  location: string;
  referralCode: string;
  status: string;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user_data",
  ]);

  useEffect(() => {
    const savedToken = cookies.access_token;
    let savedUserData = cookies.user_data;

    try {
      // Ensure savedUserData is parsed correctly
      if (typeof savedUserData === "string") {
        savedUserData = JSON.parse(savedUserData);
      }
    } catch (error) {
      console.error("Failed to parse user data from cookies:", error);
      savedUserData = null;
    }

    if (savedToken && savedUserData) {
      setToken(savedToken);
      setUserData(savedUserData);
      Api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      setIsUserLoading(false);
    }
  }, [cookies]);

  const login = (data: UserData, token: string) => {
    setUserData(data);
    setToken(token);
    setCookie("access_token", token, { path: "/" });
    setCookie("user_data", JSON.stringify(data), { path: "/" });
  };

  const logoutUser = async () => {
    try {
      setIsLoggingOut(true);
      const response = await Api.post("auth/logout");
      if (response.status === 200) {
        sessionStorage.removeItem("previousRoute");
        setUserData(null);
        setToken(null);
        removeCookie("access_token", { path: "/" });
        removeCookie("user_data", { path: "/" });
        router.push(LOGIN);
        setIsLoggingOut(false);
      }
    } catch (error) {
      setIsLoggingOut(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        token,
        setToken,
        login,
        logoutUser,
        isUserLoading,
        isLoggingOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
