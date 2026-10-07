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
  | "Processing"
  | "Draft"
  | "Rejected"
  | "Cancelled"
  | "Approved"
  | "Paid"
  | "Unpaid"
  | "Refunded"
  | "Failed"
  | "Active"
  | "Suspended"
  | "verified"
  | "unverified"
  | "completed"
  | "Completed";

interface StatusBadgeProps {
  // Any string is accepted: backend values arrive in whatever casing the API uses.
  status?: BadgeStatus | (string & {}) | null;
}

const icon = (Icon: React.ElementType) => <Icon className="h-3.5 w-3.5" />;

const GREEN = "bg-emerald-50 text-emerald-700 border-emerald-200";
const RED = "bg-red-50 text-red-700 border-red-200";
const AMBER = "bg-amber-50 text-amber-700 border-amber-200";
const ORANGE = "bg-orange-50 text-orange-700 border-orange-200";
const GRAY = "bg-gray-100 text-gray-700 border-gray-200";

// Keys are lowercase: the lookup lowercases the incoming status.
const badgeConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  audio: { icon: icon(Music4), className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  visual: { icon: icon(ImageIcon), className: "bg-pink-50 text-pink-700 border-pink-200" },

  published: { icon: icon(CheckCircle2), className: GREEN },
  approved: { icon: icon(CheckCircle2), className: GREEN },
  verified: { icon: icon(CheckCircle2), className: GREEN },
  completed: { icon: icon(CheckCircle2), className: GREEN },
  active: { icon: icon(CheckCircle2), className: GREEN },

  pending: { icon: icon(Clock3), className: AMBER },
  processing: { icon: icon(Clock3), className: "bg-sky-50 text-sky-700 border-sky-200" },

  draft: { icon: icon(FileText), className: GRAY },
  cancelled: { icon: icon(XCircle), className: GRAY },

  rejected: { icon: icon(XCircle), className: RED },
  unverified: { icon: icon(XCircle), className: RED },
  failed: { icon: icon(XCircle), className: RED },
  suspended: { icon: icon(XCircle), className: RED },

  paid: { icon: icon(DollarSign), className: "bg-green-50 text-green-700 border-green-200" },
  unpaid: { icon: icon(AlertCircle), className: ORANGE },
  refunded: { icon: icon(AlertCircle), className: ORANGE },
};

// Unknown statuses render neutral instead of crashing the page.
const FALLBACK = { icon: icon(AlertCircle), className: GRAY };

const toLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function StatusBadge({ status }: StatusBadgeProps) {
  const value = status ? String(status) : "";
  const config = badgeConfig[value.toLowerCase()] ?? FALLBACK;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        config.className,
      )}
    >
      {config.icon}
      {value ? toLabel(value) : "Unknown"}
    </span>
  );
}