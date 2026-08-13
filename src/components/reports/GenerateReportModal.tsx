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

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: (
    values: GenerateReportValues,
  ) => Promise<void>;
}

const initialValues: GenerateReportValues = {
  reportType: "",
  dateRange: "30days",
  category: "all",
  status: "all",

  includeCharts: true,
  includeSummary: true,
  includeTransactions: true,

  format: "pdf",
  delivery: "download",

  filename: `report-${Date.now()}`,

  orientation: "portrait",
  paperSize: "A4",

  compressImages: false,
  includeBranding: true,
};

export default function GenerateReportModal({
  open,
  onOpenChange,
  onGenerate,
}: GenerateReportModalProps) {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [values, setValues] =
    useState<GenerateReportValues>(initialValues);

  const update = (
    data: Partial<GenerateReportValues>,
  ) => {
    setValues((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !loading) {
      setStep(1);

      setValues({
        ...initialValues,
        filename: `report-${Date.now()}`,
      });
    }

    onOpenChange(nextOpen);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  };

  const handleGenerate = async () => {
    if (!onGenerate) {
      return;
    }

    setLoading(true);

    try {
      await onGenerate(values);

      setStep(1);

      setValues({
        ...initialValues,
        filename: `report-${Date.now()}`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to generate report:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
        {/* Header */}
        <div className="border-b bg-white px-6 py-6">
          <DialogHeader>
            <DialogTitle>
              Generate Report
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <GenerateReportStepper
              currentStep={step}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && (
            <ReportTypeStep
              value={values}
              onChange={update}
            />
          )}

          {step === 2 && (
            <ReportFiltersStep
              value={values}
              onChange={update}
            />
          )}

          {step === 3 && (
            <ReportOutputStep
              value={values}
              onChange={update}
            />
          )}

          {step === 4 && (
            <ReportSummaryStep
              values={values}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t bg-white px-6 py-6">
          <Button
            variant="outline"
            disabled={step === 1 || loading}
            onClick={handleBack}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={loading}
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Report"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}