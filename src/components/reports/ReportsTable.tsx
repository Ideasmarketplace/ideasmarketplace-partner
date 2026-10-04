"use client";

import { useMemo, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";

import ReportsToolbar from "./ReportsToolbar";
import { ReportColumns } from "./ReportsColumns";
import { Report } from "./types";

interface ReportsTableProps {
  onCreateReport: () => void;

  onView?: (report: Report) => void;
}

export default function ReportsTable({
  onCreateReport,
  onView,
}: ReportsTableProps) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState<any>("latest");

  const pageSize = 10;

  const filteredReports = useMemo(() => {
    let reports:any = [];

    if (search.trim()) {
      const value = search.toLowerCase();

      reports = reports.filter(
        (report:any) =>
          report.title.toLowerCase().includes(value) ||
          report.author.toLowerCase().includes(value) ||
          report.category.toLowerCase().includes(value),
      );
    }

    if (status !== "all") {
      reports = reports.filter(
        (report:any) => report.status === status,
      );
    }

    if (category !== "all") {
      reports = reports.filter(
        (report:any) => report.category === category,
      );
    }

    switch (sort) {
      case "title":
        reports.sort((a:any, b:any) =>
          a.title.localeCompare(b.title),
        );
        break;

      case "downloads":
        reports.sort(
          (a:any, b:any) => b.downloads - a.downloads,
        );
        break;

      case "views":
        reports.sort(
          (a:any, b:any) => b.views - a.views,
        );
        break;

      case "oldest":
        reports.reverse();
        break;

      default:
        break;
    }

    return reports;
  }, [search, status, category, sort]);

  const totalPages = Math.ceil(
    filteredReports.length / pageSize,
  );

  const paginatedReports = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredReports.slice(
      start,
      start + pageSize,
    );
  }, [filteredReports, page]);

  const columns = useMemo(
    () =>
      ReportColumns({
        onView,
      }),
    [onView],
  );

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
      <DataTable
        columns={columns}
        data={paginatedReports}
        toolbar={
          <ReportsToolbar
            onCreateReport={onCreateReport}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onCategoryChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
            onSortChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          />
        }
        stickyHeader
        zebra
        emptyTitle="No Reports Found"
        emptyDescription="Create your first report to get started."
      />

      <div className="border-t border-gray-100 p-5">
        <DataTablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredReports.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}