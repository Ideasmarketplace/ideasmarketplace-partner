"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlusCircle,
  Users,
  Wallet,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "Create Asset",
    description: "List a new digital asset",
    icon: PlusCircle,
    href: "/dashboard/assets/new",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Invite Partner",
    description: "Grow your network",
    icon: Users,
    href: "/dashboard/referrals",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Withdraw Earnings",
    description: "Transfer to your wallet",
    icon: Wallet,
    href: "/dashboard/payouts",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "View Reports",
    description: "Download analytics",
    icon: FileText,
    href: "/dashboard/reports",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Frequently used shortcuts
        </p>
      </div>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href}>
              <motion.div
                whileHover={{
                  x: 4,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group mt-2 flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      {action.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}