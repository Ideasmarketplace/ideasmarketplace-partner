"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ReportsMetricCards,
  ReportsTable,
  ReportPreviewDrawer,
  GenerateReportModal,
  Report,
} from "@/components/reports";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import { Button } from "@/components/ui/button";

import { FilePlus2, Download } from "lucide-react";

import Api from "@/utils/api";
import { ReportsSummary } from "@/components/reports/types";

interface GenerateReportPayload {
  type: string;
  startDate?: string;
  endDate?: string;
  format?: string;
}

export default function ReportsPage() {
  const [generateOpen, setGenerateOpen] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [summary, setSummary] =
    useState<ReportsSummary | null>(null);

  const [summaryLoading, setSummaryLoading] =
    useState(true);

  /**
   * Fetch report dashboard metrics
   */
  const fetchReportsSummary = useCallback(async () => {
    setSummaryLoading(true);

    try {
      const response = await Api.get(
        "/partner/reports/summary",
      );

      if (response.data?.success) {
        setSummary(response.data.data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch reports summary:",
        error,
      );

      setSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportsSummary();
  }, [fetchReportsSummary]);

  /**
   * View report details
   */
  const handleViewReport = async (report: Report) => {
    try {
      const response = await Api.get(
        `/partner/reports/${report.id}`,
      );

      if (response.data?.success) {
        setSelectedReport(response.data.data);
      } else {
        setSelectedReport(report);
      }
    } catch (error) {
      console.error(
        "Failed to fetch report details:",
        error,
      );

      setSelectedReport(report);
    }

    setDrawerOpen(true);
  };


  /**
   * Export a report
   */
  const handleExportReport = async (
    report: Report,
  ) => {
    try {
      const response = await Api.post(
        `/partner/reports/${report.id}/export`,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to export report.",
        );
      }

      return response.data;
    } catch (error) {
      console.error(
        "Failed to export report:",
        error,
      );

      throw error;
    }
  };

  /**
   * Delete report
   */
  const handleDeleteReport = async () => {
    if (!selectedReport) return;

    try {
      const response = await Api.delete(
        `/partner/reports/${selectedReport.id}`,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to delete report.",
        );
      }

      setDeleteOpen(false);
      setDrawerOpen(false);
      setSelectedReport(null);

      await fetchReportsSummary();
    } catch (error) {
      console.error(
        "Failed to delete report:",
        error,
      );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            {/* Header */}

            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Reports
                </h1>

                <p className="mt-2 text-gray-500">
                  Generate, analyze and export detailed
                  business reports.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setExportOpen(true)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>

                <Button
                  className="rounded-xl bg-indigo-600"
                  onClick={() =>
                    setGenerateOpen(true)
                  }
                >
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </section>

            {/* Metrics */}

            <ReportsMetricCards
              data={summary}
            />

            {/* Reports Table */}

            <ReportsTable
              onCreateReport={() =>
                setGenerateOpen(true)
              }
              onView={handleViewReport}
              onDelete={(report) => {
                setSelectedReport(report);
                setDeleteOpen(true);
              }}
            />

            {/* Report Preview Drawer */}

            <ReportPreviewDrawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              report={selectedReport}
              onDelete={(report) => {
                setSelectedReport(report);
                setDeleteOpen(true);
              }}
            />

            {/* Generate Report Modal */}

            <GenerateReportModal
              open={generateOpen}
              onOpenChange={setGenerateOpen}
            />

            {/* Delete Report */}

            <DeleteConfirmationDialog
              open={
                deleteOpen &&
                !!selectedReport
              }
              onOpenChange={setDeleteOpen}
              title="Delete Report"
              itemName={selectedReport?.title}
              description="This report will be permanently deleted."
              onConfirm={handleDeleteReport}
            />
          </div>
        </main>
      </div>
    </div>
  );
}