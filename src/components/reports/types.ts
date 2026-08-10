export type ReportStatus =
  | "Draft"
  | "Published"
  | "Scheduled";

export interface Report {
  id: string;
  title: string;
  description: string;
  status: ReportStatus;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  views: number;
  downloads: number;
}

export interface GenerateReportValues {
  reportType: string;
  dateRange: string;
  category: string;
  status: string;
  includeCharts: boolean;
  includeSummary: boolean;
  includeTransactions: boolean;
  format: "pdf" | "xlsx" | "csv";
  delivery: "download" | "email";
  filename: string;
  orientation: "portrait" | "landscape";
  paperSize: "A4" | "Letter";
  compressImages: boolean;
  includeBranding: boolean;
}