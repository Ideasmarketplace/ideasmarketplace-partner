"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Wallet,
  Users,
  UserPlus,
  FileBarChart2,
  CreditCard,
  Mail,
  Settings,
  CircleHelp,
  Crown,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useEffect } from "react";
import { useUserStore } from "@/utils/user-store";

const menuItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Personal Assets",
    href: "/dashboard/assets",
    icon: FolderOpen,
  },
  {
    title: "Network Members",
    href: "/dashboard/network-members",
    icon: Users,
  },
  {
    title: "Network Assets",
    href: "/dashboard/network-assets",
    icon: FolderOpen,
  },
  {
    title: "Sales & Earnings",
    href: "/dashboard/revenue",
    icon: Wallet,
  },
  // {
  //   title: "Referrals",
  //   href: "/dashboard/referrals",
  //   icon: UserPlus,
  // },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart2,
  },
  {
    title: "Payouts",
    href: "/dashboard/payouts",
    icon: CreditCard,
  },
  // {
  //   title: "Messages",
  //   href: "/dashboard/messages",
  //   icon: Mail,
  //   notification: 3,
  // },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
  // {
  //   title: "Help & Support",
  //   href: "/dashboard/help",
  //   icon: CircleHelp,
  // },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r shadow-xl transition-all duration-300 
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex items-center justify-between border-b px-6 py-5 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden border-b px-8 py-3 lg:block">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => router.push("")}>
              <Image src={Logo} alt="logo" width={60} height={60} />
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200

                    ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={19} />

                      <span>{item.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* {item.badge && (
                        <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                          {item.badge}
                        </span>
                      )} */}

                      {/* {item.notification && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                          {item.notification}
                        </span>
                      )} */}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile */}

        <div className="mt-auto border-t bg-white p-5">
          <button className="flex w-full items-center gap-3 rounded-xl transition hover:bg-gray-100 p-3">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex-1 text-left">
              <h4 className="font-semibold">{userData?.companyName}</h4>

              <p className="text-sm text-gray-500">
                Creator + Community Leader
              </p>
            </div>

            <ChevronDown size={18} className="text-gray-500" />
          </button>
        </div>
      </aside>
    </>
  );
}
