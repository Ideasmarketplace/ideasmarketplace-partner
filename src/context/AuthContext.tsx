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
      <div
        id="global-loader"
        role="status"
        aria-label="Loading"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } }`}</style>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Spinning ring */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "9999px",
              border: "4px solid #e5e7eb",
              borderTopColor: "#3b82f6",
              animation: "auth-spin 1s linear infinite",
            }}
          />

          {/* Bulb icon, stationary in the centre */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: "absolute",
              width: 40,
              height: 40,
              color: "#3b82f6",
            }}
            aria-hidden="true"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
      </div>
    );
  }

  return children;
}
