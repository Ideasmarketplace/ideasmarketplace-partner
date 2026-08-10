"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import GenerateReportStepper from "./GenerateReportStepper";
import ReportTypeStep from "./ReportTypeStep";
import ReportFiltersStep from "./ReportFiltersStep";
import ReportOutputStep from "./ReportOutputStep";
import ReportSummaryStep from "./ReportSummaryStep";
import { GenerateReportValues } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: (values: GenerateReportValues) => Promise<void>;
}

export default function GenerateReportModal({
  open,
  onOpenChange,
  onGenerate,
}: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<GenerateReportValues>({
    reportType: "",
    dateRange: "30days",
    category: "all",
    status: "all",
    includeCharts: true,
    includeSummary: true,
    includeTransactions: true,
    format: "pdf",
    delivery: "download",
    filename: `report-${new Date().getTime()}`,
    orientation: "portrait",
    paperSize: "A4",
    compressImages: false,
    includeBranding: true,
  });

  const update = (data: Partial<GenerateReportValues>) => {
    setValues((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);

    await onGenerate?.(values);

    setLoading(false);

    onOpenChange(false);

    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
        {/* Fixed Header */}
        <div className="border-b bg-white px-6 py-6">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <GenerateReportStepper currentStep={step} />
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && <ReportTypeStep value={values} onChange={update} />}

          {step === 2 && <ReportFiltersStep value={values} onChange={update} />}

          {step === 3 && <ReportOutputStep value={values} onChange={update} />}

          {step === 4 && <ReportSummaryStep values={values} />}
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-between border-t bg-white px-6 py-6">
          <Button
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
          ) : (
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
