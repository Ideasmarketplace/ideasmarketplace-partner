"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PERIOD_OPTIONS } from "./report-options";
import { GenerateReportValues, ReportPeriod } from "./types";

interface ReportFiltersStepProps {
  value: GenerateReportValues;
  onChange: (values: Partial<GenerateReportValues>) => void;
}

export default function ReportFiltersStep({
  value,
  onChange,
}: ReportFiltersStepProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Choose a period</h2>
        <p className="mt-2 text-gray-500">
          Select the time range this report should cover.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Period</Label>
        <Select
          value={value.period}
          onValueChange={(v) => onChange({ period: v as ReportPeriod })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value.period === "custom" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="report-start">Start date</Label>
            <Input
              id="report-start"
              type="date"
              max={today}
              value={value.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="report-end">End date</Label>
            <Input
              id="report-end"
              type="date"
              min={value.startDate || undefined}
              max={today}
              value={value.endDate}
              onChange={(e) => onChange({ endDate: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
