"use client";

import {
  Box,
  CheckCircle2,
  Clock3,
  Users,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AssetMetricGroup {
  totalAssets?: number;
  publishedAssets?: number;
  draftAssets?: number;
  totalBuyers?: number;
  averagePrice?: number;
}

export interface AssetMetricsData {
  audio?: AssetMetricGroup;
  visual?: AssetMetricGroup;
}

interface AssetsMetricCardsProps {
  data?: AssetMetricsData | null;
  loading?: boolean;
}

interface Metric {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClass: string;
}

function MetricSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-gray-200" />

        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
      </div>

      <div className="mt-8 space-y-3">
        <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function AssetsMetricCards({
  data,
  loading = false,
}: AssetsMetricCardsProps) {
  if (loading) {
    return (
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricSkeleton key={index} />
        ))}
      </section>
    );
  }

  const audio = data?.audio ?? {};
  const visual = data?.visual ?? {};

  /**
   * ==========================
   * Combined Asset Metrics
   * ==========================
   */

  const totalAssets =
    (audio.totalAssets ?? 0) +
    (visual.totalAssets ?? 0);

  const publishedAssets =
    (audio.publishedAssets ?? 0) +
    (visual.publishedAssets ?? 0);

  const draftAssets =
    (audio.draftAssets ?? 0) +
    (visual.draftAssets ?? 0);

  const totalBuyers =
    (audio.totalBuyers ?? 0) +
    (visual.totalBuyers ?? 0);

  const metrics: Metric[] = [
    {
      title: "Total Assets",
      value: totalAssets.toLocaleString(),
      icon: <Box className="h-6 w-6" />,
      iconClass:
        "from-indigo-500 to-violet-500 text-white",
    },

    {
      title: "Published Assets",
      value: publishedAssets.toLocaleString(),
      icon: <CheckCircle2 className="h-6 w-6" />,
      iconClass:
        "from-emerald-500 to-green-500 text-white",
    },

    {
      title: "Draft Assets",
      value: draftAssets.toLocaleString(),
      icon: <Clock3 className="h-6 w-6" />,
      iconClass:
        "from-orange-500 to-amber-500 text-white",
    },

    {
      title: "Total Buyers",
      value: totalBuyers.toLocaleString(),
      icon: <Users className="h-6 w-6" />,
      iconClass:
        "from-sky-500 to-cyan-500 text-white",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Decorative Gradient */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-50 to-transparent opacity-60" />

          {/* Header */}
          <div className="relative flex items-start justify-between">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                metric.iconClass,
              )}
            >
              {metric.icon}
            </div>

            <div className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500">
              <ArrowUpRight size={14} />
              Current
            </div>
          </div>

          {/* Body */}
          <div className="relative mt-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              {metric.value}
            </h2>

            <p className="mt-2 text-sm font-medium text-gray-500">
              {metric.title}
            </p>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-100 to-transparent opacity-40 transition-transform duration-500 group-hover:scale-125" />
        </div>
      ))}
    </section>
  );
}