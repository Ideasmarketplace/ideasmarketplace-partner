"use client";

import ReportStatusBadge from "./ReportStatusBadge";
import ReportMetadataRow from "./ReportMetadataRow";

import { Report } from "./types";

interface ReportMetadataProps {
  report: Report;
}

export default function ReportMetadata({
  report,
}: ReportMetadataProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Report Metadata
      </h3>

      <ReportMetadataRow
        label="Author"
        value={report.author}
      />

      <ReportMetadataRow
        label="Category"
        value={report.category}
      />

      <ReportMetadataRow
        label="Status"
        value={
          <ReportStatusBadge
            status={report.status}
          />
        }
      />

      <ReportMetadataRow
        label="Views"
        value={report.views.toLocaleString()}
      />

      <ReportMetadataRow
        label="Downloads"
        value={report.downloads.toLocaleString()}
      />

      <ReportMetadataRow
        label="Created"
        value={report.createdAt}
      />

      <ReportMetadataRow
        label="Last Updated"
        value={report.updatedAt}
      />

      <ReportMetadataRow
        label="Report ID"
        value={report.id}
      />
    </div>
  );
}