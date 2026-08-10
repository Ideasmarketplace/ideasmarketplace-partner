export type RevenueStatus =
  | "Completed"
  | "Pending"
  | "Refunded";

export type RevenueSource =
  | "Asset Sale"
  | "Streaming"
  | "Subscription"
  | "Licensing"
  | "Royalty"
  | "Referral";

export interface Revenue {
  id: string;
  assetId: string;
  assetName: string;
  assetThumbnail: string;
  source: RevenueSource;
  customer: string;
  amount: number;
  currency: string;
  status: RevenueStatus;
  paymentMethod: string;
  reference: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingRevenue: number;
  averageRevenue: number;
  completedTransactions: number;
  pendingTransactions: number;
}

export interface RevenueChartItem {
  month: string;
  revenue: number;
}

export interface RevenueChartData {
  data: RevenueChartItem[];
  totalRevenue?: number;
  change?: number;
}

export interface RevenueBreakdownItem {
  source: RevenueSource;
  amount: number;
  percentage: number;
}

export interface TopPerformingAsset {
  assetId: string;
  assetName: string;
  thumbnail: string;
  revenue: number;
  sales: number;
}