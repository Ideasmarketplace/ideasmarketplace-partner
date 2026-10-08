"use client";

import { format, isValid } from "date-fns";
import { Download, Eye } from "lucide-react";

import ActionMenu from "@/components/table/ActionMenu";
import { TableColumn } from "@/components/table/types";
import StatusBadge from "@/components/table/StatusBadge";
import { PERIOD_LABELS, REPORT_TYPE_LABELS } from "./report-options";
import { Report } from "./types";

interface ReportColumnActions {
  onView?: (report: Report) => void;
  onExport?: (report: Report) => void;
}

const formatDate = (v?: string) => {
  if (!v) return "—";
  const d = new Date(v);
  return isValid(d) ? format(d, "MMM d, yyyy") : "—";
};

export function ReportColumns({
  onView,
  onExport,
}: ReportColumnActions): TableColumn<Report>[] {
  return [
    {
      id: "report",
      header: "Report",
      width: "320px",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{row.title}</p>
          <p className="mt-1 text-sm text-gray-500">
            {REPORT_TYPE_LABELS[row.reportType] ?? row.reportType}
          </p>
        </div>
      ),
    },

    {
      id: "period",
      header: "Period",
      cell: (row) => PERIOD_LABELS[row.period] ?? row.period ?? "—",
    },

    {
      id: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },

    {
      id: "format",
      header: "Format",
      cell: (row) => row.fileType?.toUpperCase() ?? "—",
    },

    {
      id: "createdAt",
      header: "Created",
      cell: (row) => formatDate(row.createdAt),
    },

    {
      id: "actions",
      header: "",
      align: "right",
      cell: (row) => {
        // Files are built on demand as CSV or Excel. Older PDF reports can't be exported.
        const canDownload =
          row.status === "completed" && row.fileType !== "pdf";

        return (
          <ActionMenu
            row={row}
            actions={[
              {
                label: "View",
                icon: <Eye className="h-4 w-4" />,
                onClick: () => onView?.(row),
              },
              ...(canDownload
                ? [
                    {
                      label: "Download",
                      icon: <Download className="h-4 w-4" />,
                      onClick: () => onExport?.(row),
                    },
                  ]
                : []),
            ]}
          />
        );
      },
    },
  ];
}
