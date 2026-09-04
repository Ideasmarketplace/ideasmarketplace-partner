"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  X,
  User,
  LogOut,
} from "lucide-react";

import Api from "@/utils/api";
import { useUserStore } from "@/utils/user-store";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const userData = useUserStore((state) => state.userData);
  const logoutUser = useUserStore((state) => state.logoutUser);

  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Escape") {
      setSearchQuery("");
      setIsSearchExpanded(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await Api.post("/partner/auth/logout");

      setIsProfileOpen(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={() => {
              console.log("Menu clicked");
              onMenuClick?.();
            }}
            className="rounded-xl border border-gray-200 p-2 transition hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Expandable Search Container */}
          <div
            className={`relative flex h-11 items-center border border-gray-200 bg-white transition-all duration-300 ease-in-out ${
              isSearchExpanded
                ? "w-64 rounded-2xl px-3 sm:w-80 border-sky-500 ring-2 ring-sky-500/20"
                : "w-11 justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            }`}
            onClick={() =>
              !isSearchExpanded &&
              setIsSearchExpanded(true)
            }
          >
            {/* Search Icon */}
            <button
              type="button"
              className="flex items-center justify-center text-gray-600 focus:outline-none"
              onClick={(e) => {
                if (isSearchExpanded) return;

                e.stopPropagation();
                setIsSearchExpanded(true);
              }}
            >
              <Search className="h-5 w-5 shrink-0" />
            </button>

            {/* Expanded Input Field */}
            {isSearchExpanded && (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search assets, network members..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent pl-3 pr-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                    setIsSearchExpanded(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-4 w-4 shrink-0" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {/* <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              5
            </span>
          </button> */}

          {/* Profile Dropdown */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setIsProfileOpen((prev) => !prev)
              }
              className="flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition hover:bg-gray-100"
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
              <Image
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />

              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
                role="menu"
              >
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    router.push("/dashboard/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
                  role="menuitem"
                >
                  <User className="h-4 w-4 text-gray-500" />

                  <span>Profile</span>
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={logoutUser}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" />

                  <span>
                    {loggingOut ? "Logging out..." : "Logout"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}