"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/utils/user-store";
import Api from "@/utils/api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const setUserData = useUserStore((state) => state.setUserData);
  const setToken = useUserStore((state) => state.setToken);
  const setAuthReady = useUserStore((state) => state.setAuthReady);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await Api.get("partner/auth/session", {
          withCredentials: true,
        });
        if (res.data?.user) {
          setUserData(res.data.user);
        } else {
          setUserData(null);
        }
      } catch (err) {
        setUserData(null);
      } finally {
        setAuthReady(true);
        setLoading(false);
      }
    };

    init();
  }, [setUserData, setAuthReady]);

  if (loading) {
    return (
      <div>
        <div
          id="global-loader"
          className="fixed inset-0 z-[9999] bg-white flex justify-center items-center transition-opacity duration-500"
        >
          <div className="relative flex items-center justify-center">
            {/* 1. The Spinning Border */}
            <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

            {/* 2. The Bulb Icon (Stationary in center) */}
            <div className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-10 h-10 text-blue-500"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
