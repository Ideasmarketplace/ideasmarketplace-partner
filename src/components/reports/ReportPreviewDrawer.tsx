"use client";

import { useState } from "react";
import { format, isValid } from "date-fns";
import { Download, Loader2, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/table/StatusBadge";
import { PERIOD_LABELS, REPORT_TYPE_LABELS } from "./report-options";
import { Report } from "./types";

const fmt = (v?: string) => {
  if (!v) return "—";
  const d = new Date(v);
  return isValid(d) ? format(d, "MMM d, yyyy h:mm a") : "—";
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 text-sm last:border-none">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

interface ReportPreviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report?: Report | null;
  onExport: (report: Report) => Promise<void>;
  onDelete: (report: Report) => void;
}

export default function ReportPreviewDrawer({
  open,
  onOpenChange,
  report,
  onExport,
  onDelete,
}: ReportPreviewDrawerProps) {
  const [exporting, setExporting] = useState(false);

  if (!report) return null;

  // Files are built on demand as CSV or Excel. Older PDF reports can't be exported.
  const isPdf = report.fileType === "pdf";
  const canDownload = report.status === "completed" && !isPdf;

  const handleExport = async () => {
    setExporting(true);
    try {
      await onExport(report);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{report.title}</SheetTitle>
          <SheetDescription>
            {REPORT_TYPE_LABELS[report.reportType] ?? report.reportType} report
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6 px-4">
          <div className="rounded-2xl border border-gray-100 px-5 py-2">
            <Row
              label="Status"
              value={<StatusBadge status={report.status} />}
            />
            <Row
              label="Period"
              value={PERIOD_LABELS[report.period] ?? report.period}
            />
            <Row label="From" value={fmt(report.startDate)} />
            <Row label="To" value={fmt(report.endDate)} />
            <Row label="Format" value={report.fileType?.toUpperCase() ?? "—"} />
            <Row label="Created" value={fmt(report.createdAt)} />
          </div>

          {isPdf && (
            <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              PDF export isn't available yet. Generate this report again as CSV
              or Excel.
            </p>
          )}
          {report.status === "failed" && (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
              Generation failed. Delete this report and generate a new one.
            </p>
          )}

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-indigo-600"
              disabled={!canDownload || exporting}
              onClick={handleExport}
            >
              {exporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download
            </Button>

            <Button
              variant="outline"
              className="text-red-600"
              onClick={() => onDelete(report)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
