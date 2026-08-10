import {
  Revenue,
  RevenueMetrics,
  RevenueChartData,
  RevenueBreakdownItem,
  TopPerformingAsset,
} from "./types";

const revenueSources = [
  "Asset Sale",
  "Referral",
] as const;

const revenueStatuses = [
  "Completed",
  "Pending",
  "Refunded",
] as const;

export const revenueMetrics: RevenueMetrics = {
  totalRevenue: 2480750,
  monthlyRevenue: 32450,
  pendingRevenue: 80450,
  averageRevenue: 20730,
  completedTransactions: 182,
  pendingTransactions: 11,
};

export const revenueBreakdown: RevenueBreakdownItem[] = [
  {
    source: "Asset Sale",
    amount: 109450,
    percentage: 44,
  },
  {
    source: "Referral",
    amount: 5200,
    percentage: 2,
  },
];

export const topPerformingAssets: TopPerformingAsset[] = [
  {
    assetId: "AST-001",
    assetName: "Summer Campaign",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    revenue: 450200,
    sales: 54,
  },
  {
    assetId: "AST-002",
    assetName: "Podcast Intro",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    revenue: 389500,
    sales: 42,
  },
  {
    assetId: "AST-003",
    assetName: "Business Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    revenue: 325000,
    sales: 31,
  },
  {
    assetId: "AST-004",
    assetName: "Startup Toolkit",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    revenue: 281000,
    sales: 26,
  },
];

const generatedRevenue: Revenue[] = Array.from(
  { length: 30 },
  (_, index): Revenue => ({
    id: `REV-${String(index + 1).padStart(4, "0")}`,

    assetId: `AST-${String((index % 8) + 1).padStart(3, "0")}`,

    assetName: [
      "Summer Campaign",
      "Podcast Intro",
      "Business Masterclass",
      "Startup Toolkit",
      "Social Media Pack",
      "Creative Bundle",
      "Marketing Guide",
      "Course Materials",
    ][index % 8],

    assetThumbnail:
      index % 2 === 0
        ? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
        : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",

    source: revenueSources[index % revenueSources.length],

    customer: `Customer ${index + 1}`,

    amount: 500 + index * 175,

    currency: "NGN",

    status: revenueStatuses[index % revenueStatuses.length],

    paymentMethod:
      index % 2 === 0 ? "Stripe" : "PayPal",

    reference: `TRX${100000 + index}`,

    transactionDate: `2026-07-${String(
      (index % 28) + 1
    ).padStart(2, "0")}`,

    createdAt: `2026-07-${String(
      (index % 28) + 1
    ).padStart(2, "0")}`,

    updatedAt: `2026-07-${String(
      (index % 28) + 2
    ).padStart(2, "0")}`,

    notes:
      index % 4 === 0
        ? "Recurring subscription payment."
        : "Revenue generated from digital asset.",
  })
);

export const mockRevenue: Revenue[] = generatedRevenue;