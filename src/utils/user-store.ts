"use client";

import { create } from "zustand";
import Api from "@/utils/api";

export interface UserData {
  _id: string;
  email: string;
  companyName: string;
  industry: string;
  representativeName: string;
  role: string;
  photo: string;
  phoneNumber: string;
  communityDescription: string;
  communitySize: string;
  website: string;
  location: string;
  referralCode: string;
  status: string;
}

interface UserStore {
  userData: UserData | null;
  token: string | null;

  isUserLoading: boolean;
  isLoggingOut: boolean;

  authReady: boolean;

  setAuthReady: (v: boolean) => void;
  setUserData: (data: UserData | null) => void;
  setToken: (token: string | null) => void;
  login: (user: Partial<UserData>, token: string) => Promise<void>;
  hydrateFromAuth: (user: Partial<UserData>, token: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userData: null,
  token: null,
  isUserLoading: true,
  isLoggingOut: false,
  authReady: false,
  setAuthReady: (v) => set({ authReady: v }),
  setUserData: (data) => set({ userData: data }),
  setToken: (token) => {
    set({ token });

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete Api.defaults.headers.common["Authorization"];
    }
  },

  /**
   * LOGIN FLOW
   */
  login: async (user, token) => {
    try {
      set({
        userData: user as UserData,
        token,
        isUserLoading: true,
      });

      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } finally {
      set({
        isUserLoading: false,
        authReady: true,
      });
    }
  },

  /**
   * REFRESH FLOW
   */
  hydrateFromAuth: async (user, token) => {
    set({
      userData: user as UserData,
      token,
      isUserLoading: false,
    });

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  /**
   * LOGOUT
   */
  logoutUser: async () => {
    try {
      set({ isLoggingOut: true });

      await Api.post("auth/logout", {}, { withCredentials: true });

      delete Api.defaults.headers.common["Authorization"];

      sessionStorage.removeItem("previousRoute");

      set({
        userData: null,
        token: null,
        isLoggingOut: false,
      });

      window.location.href = "/";
    } catch (err) {
      set({ isLoggingOut: false });
    }
  },
}));
