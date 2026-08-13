"use client";

import {
  FileText,
  Eye,
  Download,
  Clock3,
} from "lucide-react";
import { ReportsSummary } from "./types";

interface ReportsMetricCardsProps {
  data?: ReportsSummary | null;
}

export default function ReportsMetricCards({
  data,
}: ReportsMetricCardsProps) {
  const metrics = [
    {
      title: "Total Reports",
      value: (data?.totalReports ?? 0).toLocaleString(),
      change: "Total generated reports",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      iconBg: "bg-indigo-100",
    },
    {
      title: "Published",
      value: (data?.published ?? 0).toLocaleString(),
      change:
        data?.totalReports
          ? `${Math.round(
              (data.published / data.totalReports) * 100,
            )}% published`
          : "0% published",
      icon: <Eye className="h-6 w-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
    },
    {
      title: "Downloads",
      value: (data?.downloads ?? 0).toLocaleString(),
      change: "Total downloads",
      icon: <Download className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      title: "Scheduled",
      value: (data?.scheduled ?? 0).toLocaleString(),
      change: "Upcoming releases",
      icon: <Clock3 className="h-6 w-6 text-orange-600" />,
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {metric.value}
              </h3>

              <p className="mt-2 text-sm text-emerald-600">
                {metric.change}
              </p>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${metric.iconBg}`}
            >
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}