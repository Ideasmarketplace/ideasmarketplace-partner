"use client";

import { useEffect, useState } from "react";

import {
  ReportsMetricCards,
  ReportsTable,
  ReportPreviewDrawer,
  GenerateReportModal,
} from "@/components/reports";
import { Report } from "@/components/reports/types";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";
import { toast } from "@/hooks/use-toast";
import { useReports } from "@/hooks/use-reports";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/user-store";

const errorMessage = (e: any) =>
  e?.response?.data?.message || e?.message || "Please try again.";

export default function ReportsPage() {
  const {
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
  } = useReports();

  const [generateOpen, setGenerateOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [userData, router]);

  const handleView = async (report: Report) => {
    setSelectedReport(report); // open immediately with the row data
    setDrawerOpen(true);
    const details = await getReport(report._id); // then fill in the full record
    if (details) {
      setSelectedReport((cur) =>
        cur?._id === report._id ? { ...report, ...details } : cur,
      );
    }
  };

  const handleExport = async (report: Report) => {
    try {
      await exportReport(report);
      toast({ title: "Download started" });
    } catch (error) {
      toast({
        title: "Export failed",
        description: errorMessage(error),
        variant: "destructive",
      });
    }
  };

  const handleGenerate = async (values: Parameters<typeof generate>[0]) => {
    const report = await generate(values); // errors bubble up so the modal shows the toast
    toast({
      title: "Report created",
      description: "Use the download button in the table to get the file.",
    });
    return report;
  };

  const handleDelete = async () => {
    if (!selectedReport) return;
    try {
      await removeReport(selectedReport._id);
      toast({ title: "Report deleted" });
      setDeleteOpen(false);
      setDrawerOpen(false);
      setSelectedReport(null);
    } catch (error) {
      toast({
        title: "Could not delete report",
        description: errorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="min-w-0 flex-1">
        <div className="space-y-6">
          <section>
            <h1 className="text-4xl font-bold tracking-tight">Reports</h1>
            <p className="mt-2 text-gray-500">
              Generate and download revenue, payout, asset and member reports.
            </p>
          </section>

          <ReportsMetricCards data={summary} loading={summaryLoading} />

          <ReportsTable
            reports={reports}
            loading={listLoading}
            pagination={pagination}
            search={filters.search}
            status={filters.status}
            reportType={filters.reportType}
            onSearch={(search) => setFilter({ search })}
            onStatusChange={(status) => setFilter({ status })}
            onTypeChange={(reportType) => setFilter({ reportType })}
            onPageChange={setPage}
            onCreateReport={() => setGenerateOpen(true)}
            onView={handleView}
            onExport={handleExport}
          />

          <ReportPreviewDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            report={selectedReport}
            onExport={handleExport}
            onDelete={(report) => {
              setSelectedReport(report);
              setDeleteOpen(true);
            }}
          />

          <GenerateReportModal
            open={generateOpen}
            onOpenChange={setGenerateOpen}
            onGenerate={handleGenerate}
          />

          <DeleteConfirmationDialog
            open={deleteOpen && !!selectedReport}
            onOpenChange={setDeleteOpen}
            title="Delete report"
            itemName={selectedReport?.title}
            description="This report will be permanently deleted."
            onConfirm={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
