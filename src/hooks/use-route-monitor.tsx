"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/utils/user-store";

export const useRouteMonitor = () => {
  const pathname = usePathname();
  const userData = useUserStore((state) => state.userData);
  const previousPath = useRef<string | null>(null);

  useEffect(() => {

    if (typeof window === "undefined") return;

    if (!userData && previousPath.current !== pathname) {
      sessionStorage.setItem("previousRoute", pathname || "/");
    }
    previousPath.current = pathname;
  }, [pathname, userData]);
};
