"use client";

import {
  FileText,
  Eye,
  Download,
  Clock3,
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
}

const metrics: MetricCard[] = [
  {
    title: "Total Reports",
    value: "248",
    change: "+18 this month",
    icon: <FileText className="h-6 w-6 text-indigo-600" />,
    iconBg: "bg-indigo-100",
  },
  {
    title: "Published",
    value: "192",
    change: "77% published",
    icon: <Eye className="h-6 w-6 text-emerald-600" />,
    iconBg: "bg-emerald-100",
  },
  {
    title: "Downloads",
    value: "18.4K",
    change: "+12.6%",
    icon: <Download className="h-6 w-6 text-blue-600" />,
    iconBg: "bg-blue-100",
  },
  {
    title: "Scheduled",
    value: "14",
    change: "Upcoming releases",
    icon: <Clock3 className="h-6 w-6 text-orange-600" />,
    iconBg: "bg-orange-100",
  },
];

export default function ReportsMetricCards() {
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