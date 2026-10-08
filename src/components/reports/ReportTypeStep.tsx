"use client";

import {
  CheckCircle2,
  LayoutDashboard,
  Landmark,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { REPORT_TYPE_LABELS } from "./report-options";
import { GenerateReportValues, ReportType } from "./types";

const reportTypes: {
  id: ReportType;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "revenue",
    description: "Earnings, commissions and transactions",
    icon: TrendingUp,
  },
  {
    id: "payouts",
    description: "Withdrawal requests and payout history",
    icon: Landmark,
  },
  {
    id: "assets",
    description: "Your assets and your network's assets",
    icon: Package,
  },
  {
    id: "members",
    description: "Referred members and their activity",
    icon: Users,
  },
  {
    id: "dashboard",
    description: "A summary across every area",
    icon: LayoutDashboard,
  },
];

interface ReportTypeStepProps {
  value: GenerateReportValues;
  onChange: (values: Partial<GenerateReportValues>) => void;
}

export default function ReportTypeStep({
  value,
  onChange,
}: ReportTypeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Choose a report type</h2>
        <p className="mt-2 text-gray-500">
          Select the kind of report you want to generate.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Report type"
        className="grid gap-4 sm:grid-cols-2"
      >
        {reportTypes.map((type) => {
          const Icon = type.icon;
          const active = value.reportType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange({ reportType: type.id })}
              className={cn(
                "relative rounded-2xl border bg-white p-5 text-left transition-all",
                active
                  ? "border-indigo-600 ring-2 ring-indigo-100"
                  : "border-gray-200 hover:border-indigo-300",
              )}
            >
              {active && (
                <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-indigo-600" />
              )}
              <Icon className="mb-4 h-8 w-8 text-indigo-600" />
              <h3 className="font-semibold">{REPORT_TYPE_LABELS[type.id]}</h3>
              <p className="mt-1 text-sm text-gray-500">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
