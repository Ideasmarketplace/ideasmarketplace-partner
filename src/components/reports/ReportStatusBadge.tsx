"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, FileEdit, Clock3 } from "lucide-react";

import { ReportStatus } from "./types";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

const statusConfig: Record<
  ReportStatus,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
  }
> = {
  Published: {
    label: "Published",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  Draft: {
    label: "Draft",
    icon: <FileEdit className="h-3.5 w-3.5" />,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },

  Scheduled: {
    label: "Scheduled",
    icon: <Clock3 className="h-3.5 w-3.5" />,
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
};

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      {config.icon}

      {config.label}
    </span>
  );
}
