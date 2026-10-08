// types.ts
export type ReportType = "revenue" | "assets" | "members" | "payouts" | "dashboard";
export type ReportPeriod = "7d" | "30d" | "90d" | "6m" | "1y" | "custom";
export type ReportFormat = "pdf" | "csv" | "xlsx";
export type ReportStatus = "processing" | "completed" | "failed";

export interface Report {
  _id: string;
  title: string;
  reportType: ReportType;
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
  status: ReportStatus;
  fileType?: ReportFormat;
  fileUrl?: string;
  fileSize?: number;
  generatedAt?: string;
  createdAt: string;
}

export interface ReportsSummary {
  totalReports: number;
  completedReports: number;
  processingReports: number;
  failedReports: number;
  lastGeneratedAt: string | null;
}

export interface ReportPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GenerateReportValues {
  reportType: ReportType | "";
  period: ReportPeriod;
  startDate: string; // YYYY-MM-DD, only used when period is "custom"
  endDate: string;
  format: ReportFormat;
  title: string;
}

