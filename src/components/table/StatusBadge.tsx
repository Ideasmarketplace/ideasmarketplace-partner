"use client";

import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
  Music4,
  ImageIcon,
  DollarSign,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "Audio"
  | "Visual"
  | "Published"
  | "Pending"
  | "Draft"
  | "Rejected"
  | "Approved"
  | "Paid"
  | "Unpaid"
  | "Completed"
  | "Refunded"
  | "Failed"
  | "Active"
  | "Suspended";

interface StatusBadgeProps {
  status: BadgeStatus;
}

const badgeConfig: Record<
  BadgeStatus,
  {
    icon: React.ReactNode;
    className: string;
  }
> = {
  Audio: {
    icon: <Music4 className="h-3.5 w-3.5" />,
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  Visual: {
    icon: <ImageIcon className="h-3.5 w-3.5" />,
    className: "bg-pink-50 text-pink-700 border-pink-200",
  },

  Published: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Approved: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Pending: {
    icon: <Clock3 className="h-3.5 w-3.5" />,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  Draft: {
    icon: <FileText className="h-3.5 w-3.5" />,
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },

  Rejected: {
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-red-50 text-red-700 border-red-200",
  },

  Paid: {
    icon: <DollarSign className="h-3.5 w-3.5" />,
    className: "bg-green-50 text-green-700 border-green-200",
  },

  Unpaid: {
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },

  Completed: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Refunded: {
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },

  Failed: {
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-red-50 text-red-700 border-red-200",
  },
  Active: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Suspended: {
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = badgeConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        config.className,
      )}
    >
      {config.icon}

      {status}
    </span>
  );
}
