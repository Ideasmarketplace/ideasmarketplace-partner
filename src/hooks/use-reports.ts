"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Api from "@/utils/api";
import type {
  GenerateReportValues,
  Report,
  ReportPagination,
  ReportsSummary,
} from "@/components/reports/types";

const BASE = "/partner/reports";
export const PAGE_SIZE = 10;
const POLL_MS = 5000;
const MAX_POLLS = 60; // ~5 minutes, so a stuck report doesn't poll forever

interface Filters {
  page: number;
  search: string;
  status: string;
  reportType: string;
}

const slugify = (s: string) =>
  s
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "report";

async function blobError(error: any): Promise<Error> {
  const data = error?.response?.data;
  if (data instanceof Blob) {
    try {
      const json = JSON.parse(await data.text());
      return new Error(json.message || "Export failed.");
    } catch {
      /* not JSON, fall through */
    }
  }
  return new Error(
    error?.response?.data?.message || error?.message || "Export failed.",
  );
}

export function useReports() {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    search: "",
    status: "all",
    reportType: "all",
  });
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [pagination, setPagination] = useState<ReportPagination>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    pages: 1,
  });
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await Api.get(`${BASE}/summary`);
      if (res.data?.success) setSummary(res.data.data);
    } catch (error) {
      console.error("Failed to fetch reports summary:", error);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  const fetchReports = useCallback(
    async (silent = false) => {
      if (!silent) setListLoading(true);
      try {
        const params: Record<string, string | number> = {
          page: filters.page,
          limit: PAGE_SIZE,
        };
        if (filters.search.trim()) params.search = filters.search.trim();
        if (filters.status !== "all") params.status = filters.status;
        if (filters.reportType !== "all")
          params.reportType = filters.reportType;

        const res = await Api.get(BASE, { params });
        if (res.data?.success) {
          setReports(res.data.reports ?? []);
          setPagination(res.data.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        if (!silent) setReports([]);
      } finally {
        setListLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Poll while anything is processing, so Completed/Failed appears without a refresh.
  const pollCount = useRef(0);
  const hasProcessing =
    (summary?.processingReports ?? 0) > 0 ||
    reports.some((r) => r.status === "processing");

  useEffect(() => {
    if (!hasProcessing) {
      pollCount.current = 0;
      return;
    }
    const id = setInterval(() => {
      if (++pollCount.current > MAX_POLLS) {
        clearInterval(id);
        return;
      }
      fetchReports(true);
      fetchSummary();
    }, POLL_MS);
    return () => clearInterval(id);
  }, [hasProcessing, fetchReports, fetchSummary]);

  const setFilter = (patch: Partial<Omit<Filters, "page">>) =>
    setFilters((f) => ({ ...f, ...patch, page: 1 }));
  const setPage = (page: number) => setFilters((f) => ({ ...f, page }));

  const getReport = async (id: string): Promise<Report | null> => {
    try {
      const res = await Api.get(`${BASE}/${id}`);
      return res.data?.success ? res.data.data : null;
    } catch {
      return null;
    }
  };

  /** Starts generation. Throws on failure so the modal can show the server's message. */
  const generate = async (values: GenerateReportValues) => {
    const res = await Api.post(`${BASE}/generate`, {
      title: values.title.trim(),
      reportType: values.reportType,
      fileType: values.format,
      period: values.period,
      ...(values.period === "custom"
        ? { startDate: values.startDate, endDate: values.endDate }
        : {}),
    });

    if (!res.data?.success) {
      throw new Error(
        res.data?.message || "Failed to start report generation.",
      );
    }

    setFilters((f) => ({ ...f, page: 1 })); // newest first, so show page 1
    fetchSummary();
    return res.data.data as Report;
  };

  /** Asks the API for the finished file and downloads it. Throws on failure. */
  const exportReport = async (report: Report) => {
    try {
      const res = await Api.post(`${BASE}/${report._id}/export`, null, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slugify(report.title)}.${report.fileType ?? "xlsx"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      throw await blobError(error);
    }
  };

  const removeReport = async (id: string) => {
    const res = await Api.delete(`${BASE}/${id}`);
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to delete report.");
    }
    if (reports.length === 1 && filters.page > 1) setPage(filters.page - 1);
    else fetchReports(true);
    fetchSummary();
  };

  return {
    summary,
    summaryLoading,
    reports,
    pagination,
    listLoading,
    filters,
    setFilter,
    setPage,
    getReport,
    generate,
    exportReport,
    removeReport,
  };
}
