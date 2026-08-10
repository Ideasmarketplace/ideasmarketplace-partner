"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

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

export default function ReportsPage() {
  const [generateOpen, setGenerateOpen] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            {/* Header */}

            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Reports</h1>

                <p className="mt-2 text-gray-500">
                  Generate, analyze and export detailed business reports.
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
                  onClick={() => setGenerateOpen(true)}
                >
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </section>

            <ReportsMetricCards />

            <ReportsTable
              onCreateReport={() => setGenerateOpen(true)}
              onView={(report) => {
                setSelectedReport(report);
                setDrawerOpen(true);
              }}
              onDelete={(report) => {
                setSelectedReport(report);
                setDeleteOpen(true);
              }}
            />

            <ReportPreviewDrawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              report={selectedReport}
              onDelete={(report) => {
                setSelectedReport(report);
                setDeleteOpen(true);
              }}
            />

            <GenerateReportModal
              open={generateOpen}
              onOpenChange={setGenerateOpen}
            />

            <DeleteConfirmationDialog
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              title="Delete Report"
              itemName={selectedReport?.title}
              description="This report will be permanently deleted."
              onConfirm={async () => {
                if (!selectedReport) return;

                // await deleteReport(selectedReport.id);

                setDeleteOpen(false);
                setDrawerOpen(false);
                setSelectedReport(null);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
