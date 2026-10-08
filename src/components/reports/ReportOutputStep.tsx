"use client";

import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Table as TableIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenerateReportValues, ReportFormat } from "./types";

const TITLE_MAX = 200;

const formats: {
  id: ReportFormat;
  title: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "xlsx",
    title: "Excel",
    description: "Summary plus every table",
    icon: FileSpreadsheet,
  },
  { id: "csv", title: "CSV", description: "Main table only", icon: TableIcon },
];

interface ReportOutputStepProps {
  value: GenerateReportValues;
  onChange: (values: Partial<GenerateReportValues>) => void;
}

export default function ReportOutputStep({
  value,
  onChange,
}: ReportOutputStepProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold">Output</h2>
        <p className="mt-2 text-gray-500">
          Name the report and choose its format.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="report-title">Report title</Label>
        <Input
          id="report-title"
          value={value.title}
          maxLength={TITLE_MAX}
          onChange={(e) => onChange({ title: e.target.value })}
        />
        <p className="text-right text-xs text-gray-400">
          {value.title.length}/{TITLE_MAX}
        </p>
      </div>

      <div className="space-y-4">
        <Label id="report-format-label">Format</Label>

        <div
          role="radiogroup"
          aria-labelledby="report-format-label"
          className="grid gap-4 md:grid-cols-2"
        >
          {formats.map((format) => {
            const Icon = format.icon;
            const active = value.format === format.id;

            return (
              <button
                key={format.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ format: format.id })}
                className={cn(
                  "relative rounded-2xl border bg-white p-5 text-left transition-all",
                  active
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-gray-200 hover:border-indigo-300",
                )}
              >
                {active && (
                  <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-indigo-600" />
                )}
                <Icon className="mb-4 h-8 w-8 text-indigo-600" />
                <h3 className="font-semibold">{format.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {format.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
