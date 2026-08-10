"use client";

import { useEffect, useState } from "react";

import {
  RevenueMetricCards,
  RevenueChart,
  RevenueBreakdown,
  TopPerformingAssets,
  RevenueTable,
  RevenuePreviewDrawer,
  Revenue,
} from "@/components/revenue";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import Api from "@/utils/api";
import { TopPerformingAsset } from "@/components/revenue/TopPerformingAssets";

interface RevenueMetrics {
  totalRevenue: number;
  totalCommission: number;
  totalTransactions: number;
  averageOrderValue: number;
}

interface RevenueBreakdownItem {
  source: string;
  amount: number;
  percentage: number;
}

export default function RevenuePage() {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);

  const [topPerformingAssets, setTopPerformingAssets] =
  useState<TopPerformingAsset[]>([]);

  const [revenueBreakdown, setRevenueBreakdown] = useState<
    RevenueBreakdownItem[]
  >([]);

  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const [loadingTopAssets, setLoadingTopAssets] = useState(true);

  const [loadingBreakdown, setLoadingBreakdown] = useState(false);

  const [selectedRevenue, setSelectedRevenue] =
    useState<Revenue | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  /**
   * Fetch revenue metrics
   */
  useEffect(() => {
    const fetchRevenueMetrics = async () => {
      try {
        setLoadingMetrics(true);

        const response = await Api.get("partner/revenue/metrics");

        if (response.data?.success) {
          setMetrics(response.data.data || null);
        } else {
          setMetrics(null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch revenue metrics:",
          error,
        );

        setMetrics(null);
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchRevenueMetrics();
  }, []);

  /**
   * Fetch top performing assets
   */
  useEffect(() => {
    const fetchTopPerformingAssets = async () => {
      try {
        setLoadingTopAssets(true);

        const response = await Api.get(
          "partner/revenue/top-performing-assets",
        );

        if (response.data?.success) {
          setTopPerformingAssets(
            response.data.data || [],
          );
        } else {
          setTopPerformingAssets([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch top performing assets:",
          error,
        );

        setTopPerformingAssets([]);
      } finally {
        setLoadingTopAssets(false);
      }
    };

    fetchTopPerformingAssets();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}

      <section>
        <h1 className="text-4xl font-bold tracking-tight">
          Sales and Earnings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track revenue performance, monitor transactions
          and analyze your earnings.
        </p>
      </section>

      {/* Revenue Metrics */}

      <RevenueMetricCards
        data={metrics}
        loading={loadingMetrics}
      />

      {/* Revenue Analytics */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Revenue Chart */}

        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        {/* Revenue Breakdown */}

        <RevenueBreakdown
          data={revenueBreakdown}
          loading={loadingBreakdown}
        />
      </div>

      {/* Top Performing Assets */}

      <TopPerformingAssets
        data={topPerformingAssets}
        loading={loadingTopAssets}
      />

      {/* Revenue Transactions */}

      <RevenueTable
        onView={(revenue) => {
          setSelectedRevenue(revenue);
          setDrawerOpen(true);
        }}
        onEdit={(revenue) => {
          console.log("Edit revenue:", revenue);
        }}
        onDelete={(revenue) => {
          setSelectedRevenue(revenue);
          setDeleteOpen(true);
        }}
        onExport={() => {
          console.log("Export revenue");
        }}
      />

      {/* Revenue Details Drawer */}

      <RevenuePreviewDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        revenue={selectedRevenue}
        onEdit={(revenue) => {
          console.log("Edit revenue:", revenue);
        }}
        onExport={(revenue) => {
          console.log("Export revenue:", revenue);
        }}
        onDelete={(revenue) => {
          setSelectedRevenue(revenue);
          setDeleteOpen(true);
        }}
      />

      {/* Delete Confirmation */}

      <DeleteConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Revenue Record"
        description="This revenue record will be permanently removed."
        itemName={selectedRevenue?.assetName}
        onConfirm={async () => {
          if (!selectedRevenue) {
            return;
          }

          /*
           * Add a delete endpoint here if revenue
           * records become deletable.
           */

          setDeleteOpen(false);
          setDrawerOpen(false);
          setSelectedRevenue(null);
        }}
      />
    </div>
  );
}

