"use client";

import {
  BarChart3,
  ImageIcon,
  Users,
  Wallet,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { REPORT_TYPES } from "./report-types";
import { GenerateReportValues } from "./types";

interface ReportTypeStepProps {
  value: GenerateReportValues;
  onChange: (
    values: Partial<GenerateReportValues>
  ) => void;
}

const icons = {
  assets: ImageIcon,
  payouts: Wallet,
  network: Users,
  revenue: BarChart3,
};

export default function ReportTypeStep({
  value,
  onChange,
}: ReportTypeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">
          Select Report Type
        </h2>

        <p className="mt-2 text-gray-500">
          Choose the report you want to generate.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {REPORT_TYPES.map((type) => {
          const Icon =
            icons[type.id as keyof typeof icons];

          const active =
            value.reportType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                onChange({
                  reportType: type.id,
                })
              }
              className={cn(
                "relative rounded-3xl border bg-white p-6 text-left transition-all",
                active
                  ? "border-indigo-600 ring-2 ring-indigo-100"
                  : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
              )}
            >
              {active && (
                <CheckCircle2 className="absolute right-5 top-5 h-6 w-6 text-indigo-600" />
              )}

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                <Icon className="h-7 w-7 text-indigo-600" />
              </div>

              <h3 className="text-lg font-semibold">
                {type.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {type.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}