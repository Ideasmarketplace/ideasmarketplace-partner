"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Report",
    description: "Choose report type",
  },
  {
    id: 2,
    title: "Filters",
    description: "Configure data",
  },
  {
    id: 3,
    title: "Output",
    description: "Export settings",
  },
  {
    id: 4,
    title: "Generate",
    description: "Review & generate",
  },
];

interface GenerateReportStepperProps {
  currentStep: number;
}

export default function GenerateReportStepper({
  currentStep,
}: GenerateReportStepperProps) {
  return (
    <div className="mt-6">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const completed = currentStep > step.id;
          const active = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-start"
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                    completed &&
                      "border-indigo-600 bg-indigo-600 text-white",
                    active &&
                      "border-indigo-600 bg-white text-indigo-600",
                    !completed &&
                      !active &&
                      "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      active || completed
                        ? "text-gray-900"
                        : "text-gray-400"
                    )}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="mx-4 mt-5 h-0.5 flex-1">
                  <div className="relative h-full rounded-full bg-gray-200">
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full rounded-full transition-all duration-300",
                        currentStep > step.id
                          ? "w-full bg-indigo-600"
                          : "w-0 bg-indigo-600"
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}