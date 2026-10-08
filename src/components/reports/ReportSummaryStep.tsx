"use client";

import { Download } from "lucide-react";

import {
  FORMAT_LABELS,
  PERIOD_LABELS,
  REPORT_TYPE_LABELS,
} from "./report-options";
import { GenerateReportValues } from "./types";

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-none">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="text-right font-medium">{value}</div>
    </div>
  );
}

export default function ReportSummaryStep({
  values,
}: {
  values: GenerateReportValues;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Review report</h2>
        <p className="mt-2 text-gray-500">
          Confirm your selections before generating.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <SummaryRow label="Title" value={values.title} />
        <SummaryRow
          label="Report type"
          value={REPORT_TYPE_LABELS[values.reportType] ?? values.reportType}
        />
        <SummaryRow
          label="Period"
          value={
            <>
              {PERIOD_LABELS[values.period]}
              {values.period === "custom" &&
                values.startDate &&
                values.endDate && (
                  <p className="text-xs font-normal text-gray-500">
                    {values.startDate} to {values.endDate}
                  </p>
                )}
            </>
          }
        />
        <SummaryRow label="Format" value={FORMAT_LABELS[values.format]} />
      </div>

      <div className="rounded-3xl bg-gray-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <Download className="h-6 w-6 shrink-0" />
          <div>
            <h3 className="font-semibold">Ready to generate</h3>
            <p className="mt-1 text-sm text-gray-300">
              Generation runs in the background. The report shows as Completed
              in the table when it is ready to download.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
