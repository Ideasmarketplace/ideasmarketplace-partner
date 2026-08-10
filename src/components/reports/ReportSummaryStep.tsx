"use client";

import {
  FileText,
  CalendarDays,
  Download,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  REPORT_TYPE_OPTIONS,
  DATE_RANGE_OPTIONS,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  FORMAT_OPTIONS,
  DELIVERY_OPTIONS,
} from "./report-options";

import { getOptionLabel } from "./report-utils";

import { GenerateReportValues } from "./types";

interface ReportSummaryStepProps {
  values: GenerateReportValues;
}

interface SummaryRowProps {
  label: string;
  value: React.ReactNode;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-none">
      <span className="text-sm text-gray-500">{label}</span>

      <div className="font-medium">{value}</div>
    </div>
  );
}

export default function ReportSummaryStep({ values }: ReportSummaryStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Review Report</h2>

        <p className="mt-2 text-gray-500">
          Confirm your selections before generating the report.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <SummaryRow
          label="Report Type"
          value={getOptionLabel(REPORT_TYPE_OPTIONS, values.reportType)}
        />

        <SummaryRow label="Date Range" value={values.dateRange} />

        <SummaryRow
          label="Category"
          value={getOptionLabel(CATEGORY_OPTIONS, values.category)}
        />

        <SummaryRow
          label="Status"
          value={getOptionLabel(STATUS_OPTIONS, values.status)}
        />

        <SummaryRow
          label="Export Format"
          value={getOptionLabel(FORMAT_OPTIONS, values.format)}
        />

        <SummaryRow
          label="Delivery"
          value={getOptionLabel(DELIVERY_OPTIONS, values.delivery)}
        />

        <SummaryRow label="Filename" value={values.filename} />

        {values.format === "pdf" && (
          <>
            <SummaryRow label="Paper Size" value={values.paperSize} />

            <SummaryRow label="Orientation" value={values.orientation} />
          </>
        )}
      </div>

      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-0.5 h-6 w-6 text-indigo-600" />

          <div>
            <h3 className="font-semibold text-indigo-900">Report Contents</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {values.includeCharts && (
                <Badge variant="secondary">Charts</Badge>
              )}

              {values.includeSummary && (
                <Badge variant="secondary">Executive Summary</Badge>
              )}

              {values.includeTransactions && (
                <Badge variant="secondary">Transactions</Badge>
              )}

              {values.includeBranding && (
                <Badge variant="secondary">Branding</Badge>
              )}

              {values.compressImages && (
                <Badge variant="secondary">Compressed Images</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-gray-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <Download className="h-6 w-6" />

          <div>
            <h3 className="font-semibold">Ready to Generate</h3>

            <p className="mt-1 text-sm text-gray-300">
              Your report will be generated using the selected filters and
              output settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
