export type RevenueStatus =
  | "Completed"
  | "Pending"
  | "Refunded";

export type RevenueSource =
  | "Digital Asset"
  | "Collection"
  | "Audio Bundle"
  | "Visual"
  | "Idea"

export interface Revenue {
  id: string;
  itemTitle: string;
  itemType: RevenueSource;
  assetThumbnail: string;
  buyerName: string;
  amount: number;
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