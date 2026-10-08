"use client";

import { useEffect, useMemo, useState } from "react";
import { FilePlus2, Search } from "lucide-react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ReportColumns } from "./ReportsColumns";
import { REPORT_TYPE_LABELS } from "./report-options";
import { Report, ReportPagination } from "./types";

interface ReportsTableProps {
  reports: Report[];
  loading: boolean;
  pagination: ReportPagination;
  search: string;
  status: string;
  reportType: string;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onCreateReport: () => void;
  onView: (report: Report) => void;
  onExport: (report: Report) => void;
}

export default function ReportsTable({
  reports,
  loading,
  pagination,
  search,
  status,
  reportType,
  onSearch,
  onStatusChange,
  onTypeChange,
  onPageChange,
  onCreateReport,
  onView,
  onExport,
}: ReportsTableProps) {
  // Debounced: the API is only called 300ms after the user stops typing.
  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    if (searchText === search) return;
    const id = setTimeout(() => onSearch(searchText), 300);
    return () => clearTimeout(id);
  }, [searchText, search, onSearch]);

  const columns = useMemo(
    () => ReportColumns({ onView, onExport }),
    [onView, onExport],
  );

  const toolbar = (
    <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search reports..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={reportType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {Object.entries(REPORT_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Button className="rounded-xl bg-indigo-600" onClick={onCreateReport}>
          <FilePlus2 className="mr-2 h-4 w-4" />
          Generate report
        </Button>
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
      {loading && reports.length === 0 ? (
        <>
          {toolbar}
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </>
      ) : (
        <DataTable
          columns={columns}
          data={reports}
          toolbar={toolbar}
          stickyHeader
          zebra
          emptyTitle="No reports found"
          emptyDescription="Generate your first report to get started."
        />
      )}

      <div className="border-t border-gray-100 p-5">
        <DataTablePagination
          currentPage={pagination.page}
          totalPages={Math.max(pagination.pages, 1)}
          totalItems={pagination.total}
          pageSize={pagination.limit}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
