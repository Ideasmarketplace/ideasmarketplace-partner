"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GenerateReportValues } from "./types";
import { DATE_RANGE_OPTIONS } from "./report-options";

interface ReportFiltersStepProps {
  value: GenerateReportValues;

  onChange: (values: Partial<GenerateReportValues>) => void;
}

export default function ReportFiltersStep({
  value,
  onChange,
}: ReportFiltersStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Configure Report</h2>

        <p className="mt-2 text-gray-500">
          Select the filters that should be applied to this report.
        </p>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label>Date Range</Label>

        <Select
          value={value.dateRange}
          onValueChange={(dateRange) => onChange({ dateRange })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {DATE_RANGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Filters */}
      {value.reportType === "assets" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={value.category}
              onValueChange={(category) => onChange({ category })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>

                <SelectItem value="audio">Audio</SelectItem>

                <SelectItem value="visual">Visual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={value.status}
              onValueChange={(status) => onChange({ status })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>

                <SelectItem value="active">Active</SelectItem>

                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {value.reportType === "payouts" && (
        <div className="space-y-2">
          <Label>Payout Status</Label>

          <Select
            value={value.status}
            onValueChange={(status) => onChange({ status })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>

              <SelectItem value="paid">Paid</SelectItem>

              <SelectItem value="pending">Pending</SelectItem>

              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {value.reportType === "network" && (
        <div className="space-y-2">
          <Label>Network Level</Label>

          <Select
            value={value.category}
            onValueChange={(category) => onChange({ category })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>

              <SelectItem value="direct">Direct Referrals</SelectItem>

              <SelectItem value="team">Team Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {value.reportType === "revenue" && (
        <div className="space-y-2">
          <Label>Revenue Source</Label>

          <Select
            value={value.category}
            onValueChange={(category) => onChange({ category })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>

              <SelectItem value="sales">Sales</SelectItem>

              <SelectItem value="commissions">Commissions</SelectItem>

              <SelectItem value="bonuses">Bonuses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Include Options */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
        <h3 className="mb-4 font-semibold">Include in Report</h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={value.includeCharts}
              onCheckedChange={(checked) =>
                onChange({
                  includeCharts: Boolean(checked),
                })
              }
            />

            <Label>Charts & Graphs</Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              checked={value.includeSummary}
              onCheckedChange={(checked) =>
                onChange({
                  includeSummary: Boolean(checked),
                })
              }
            />

            <Label>Executive Summary</Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              checked={value.includeTransactions}
              onCheckedChange={(checked) =>
                onChange({
                  includeTransactions: Boolean(checked),
                })
              }
            />

            <Label>Detailed Transactions</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
