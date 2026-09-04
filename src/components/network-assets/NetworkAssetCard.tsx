"use client";

import {
  Wallet,
  FolderOpen,
  Users,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import CountUp from "react-countup";

export type StatType = "publishedAssets" | "totalAssets" | "drafts" | "members";

export interface StatCardData {
  value: number;
  change?: string;
  changeLabel: string;
}

interface StatCardProps {
  type: StatType;
  data: StatCardData;
}

interface StatConfig {
  title: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  valuePrefix?: string;
}

const stats: Record<StatType, StatConfig> = {
  publishedAssets: {
    title: "Published Assets",
    icon: FolderOpen,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },

  totalAssets: {
    title: "Total Assets",
    icon: FolderOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  drafts: {
    title: "Drafts Assets",
    icon: FolderOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  members: {
    title: "Contributing Members",
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
};

export default function NetworkAssetCard({ type, data }: StatCardProps) {
  const stat = stats[type];
  const Icon = stat.icon;

  const value = Number(data?.value ?? 0);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {stat.valuePrefix}
            <CountUp end={value} duration={1.5} separator="," />
          </h3>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg}`}
        >
          <Icon className={`h-7 w-7 ${stat.iconColor}`} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {data.change && (
            <span className="text-sm font-semibold text-green-600">
              {data.change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
