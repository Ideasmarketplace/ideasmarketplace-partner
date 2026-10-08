"use client";

import { format, isValid } from "date-fns";
import { FileText, CheckCircle2, Clock3, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportsSummary } from "./types";

interface ReportsMetricCardsProps {
  data?: ReportsSummary | null;
  loading?: boolean;
}

export default function ReportsMetricCards({
  data,
  loading = false,
}: ReportsMetricCardsProps) {
  const total = data?.totalReports ?? 0;
  const completionRate = total
    ? Math.round(((data?.completedReports ?? 0) / total) * 100)
    : 0;
  const last = data?.lastGeneratedAt ? new Date(data.lastGeneratedAt) : null;

  const metrics = [
    {
      title: "Total reports",
      value: total,
      note:
        last && isValid(last)
          ? `Last generated ${format(last, "MMM d, yyyy")}`
          : "None generated yet",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      iconBg: "bg-indigo-100",
    },
    {
      title: "Completed",
      value: data?.completedReports ?? 0,
      note: `${completionRate}% of all reports`,
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
    },
    {
      title: "Processing",
      value: data?.processingReports ?? 0,
      note: "Being generated",
      icon: <Clock3 className="h-6 w-6 text-amber-600" />,
      iconBg: "bg-amber-100",
    },
    {
      title: "Failed",
      value: data?.failedReports ?? 0,
      note: "Delete and generate again",
      icon: <AlertCircle className="h-6 w-6 text-red-600" />,
      iconBg: "bg-red-100",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <div
          key={m.title}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{m.title}</p>
              {loading ? (
                <Skeleton className="mt-3 h-9 w-20" />
              ) : (
                <h3 className="mt-3 text-3xl font-bold">
                  {m.value.toLocaleString()}
                </h3>
              )}
              <p className="mt-2 text-sm text-gray-500">{m.note}</p>
            </div>
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${m.iconBg}`}
            >
              {m.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
