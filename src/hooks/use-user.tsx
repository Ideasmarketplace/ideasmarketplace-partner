"use client";

import { UserData } from "@/context/user-content";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface UserContextType {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (userData: UserData, token: string) => void;
  logoutUser: () => void;
  isUserLoading: boolean;
  isLoggingOut: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}