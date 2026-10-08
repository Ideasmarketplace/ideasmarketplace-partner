"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import GenerateReportStepper from "./GenerateReportStepper";
import ReportTypeStep from "./ReportTypeStep";
import ReportFiltersStep from "./ReportFiltersStep";
import ReportOutputStep from "./ReportOutputStep";
import ReportSummaryStep from "./ReportSummaryStep";

import { PERIOD_LABELS, REPORT_TYPE_LABELS } from "./report-options";
import { GenerateReportValues } from "./types";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Should throw on failure so this modal can show the server's message. */
  onGenerate: (values: GenerateReportValues) => Promise<unknown>;
}

const initialValues: GenerateReportValues = {
  reportType: "",
  period: "30d",
  startDate: "",
  endDate: "",
  format: "xlsx",
  title: "",
};

const defaultTitle = (v: GenerateReportValues) =>
  `${REPORT_TYPE_LABELS[v.reportType] ?? "Custom"} report, ${PERIOD_LABELS[v.period].toLowerCase()}`;

const LAST_STEP = 4;

export default function GenerateReportModal({
  open,
  onOpenChange,
  onGenerate,
}: GenerateReportModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<GenerateReportValues>(initialValues);
  // Once the user types their own title, stop overwriting it with the suggestion.
  const [titleEdited, setTitleEdited] = useState(false);

  const update = (data: Partial<GenerateReportValues>) => {
    if ("title" in data) setTitleEdited(true);
    setValues((prev) => ({ ...prev, ...data }));
  };

  const reset = () => {
    setStep(1);
    setValues(initialValues);
    setTitleEdited(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !loading) reset();
    onOpenChange(next);
  };

  const customRangeValid =
    Boolean(values.startDate) &&
    Boolean(values.endDate) &&
    values.startDate <= values.endDate;

  const canContinue =
    step === 1
      ? Boolean(values.reportType)
      : step === 2
        ? values.period !== "custom" || customRangeValid
        : step === 3
          ? values.title.trim().length > 0
          : true;

  const handleNext = () => {
    if (step === 2 && !titleEdited) {
      setValues((prev) => ({ ...prev, title: defaultTitle(prev) }));
    }
    setStep((s) => Math.min(s + 1, LAST_STEP));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await onGenerate(values);
      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Could not generate report",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
        <div className="border-b bg-white px-6 py-6">
          <DialogHeader>
            <DialogTitle>Generate report</DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <GenerateReportStepper currentStep={step} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && <ReportTypeStep value={values} onChange={update} />}
          {step === 2 && <ReportFiltersStep value={values} onChange={update} />}
          {step === 3 && <ReportOutputStep value={values} onChange={update} />}
          {step === 4 && <ReportSummaryStep values={values} />}
        </div>

        <div className="flex justify-between border-t bg-white px-6 py-6">
          <Button
            variant="outline"
            disabled={step === 1 || loading}
            onClick={() => setStep((s) => Math.max(s - 1, 1))}
          >
            Back
          </Button>

          {step < LAST_STEP ? (
            <Button onClick={handleNext} disabled={!canContinue || loading}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Starting..." : "Generate report"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
