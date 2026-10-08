import type { ReportPeriod } from "./types";

export const REPORT_TYPE_LABELS: Record<string, string> = {
  revenue: "Revenue",
  payouts: "Payouts",
  assets: "Assets",
  members: "Members",
  dashboard: "Dashboard overview",
};

export const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last 12 months" },
  { value: "custom", label: "Custom range" },
];

export const PERIOD_LABELS: Record<string, string> = Object.fromEntries(
  PERIOD_OPTIONS.map((o) => [o.value, o.label]),
);

export const FORMAT_LABELS: Record<string, string> = {
  pdf: "PDF", xlsx: "Excel", csv: "CSV",
};


export const REPORT_TYPE_OPTIONS = [
  {
    value: "assets",
    label: "Asset Performance",
  },
  {
    value: "payouts",
    label: "Payout Summary",
  },
  {
    value: "network",
    label: "Network Performance",
  },
  {
    value: "revenue",
    label: "Revenue Analytics",
  },
];

export const DATE_RANGE_OPTIONS = [
  {
    value: "7days",
    label: "Last 7 Days",
  },
  {
    value: "30days",
    label: "Last 30 Days",
  },
  {
    value: "90days",
    label: "Last 90 Days",
  },
  {
    value: "year",
    label: "This Year",
  },
  {
    value: "custom",
    label: "Custom Range",
  },
];

export const CATEGORY_OPTIONS = [
  {
    value: "all",
    label: "All Assets",
  },
  {
    value: "audio",
    label: "Audio",
  },
  {
    value: "visual",
    label: "Visual",
  },
];

export const STATUS_OPTIONS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "archived",
    label: "Archived",
  },
];

export const FORMAT_OPTIONS = [
  {
    value: "pdf",
    label: "PDF Document",
  },
  {
    value: "xlsx",
    label: "Excel Spreadsheet (.xlsx)",
  },
  {
    value: "csv",
    label: "CSV File (.csv)",
  },
];

export const DELIVERY_OPTIONS = [
  {
    value: "download",
    label: "Download Immediately",
  },
  {
    value: "email",
    label: "Send via Email",
  },
];