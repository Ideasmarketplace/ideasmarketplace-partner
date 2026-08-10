"use client";

// components/layout/DashboardLayout.tsx

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/Header";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1 lg:ml-72">
          <Header
            onMenuClick={() => {
              console.log("Opening sidebar");
              setSidebarOpen(true);
            }}
          />

          <div className="space-y-6 p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
