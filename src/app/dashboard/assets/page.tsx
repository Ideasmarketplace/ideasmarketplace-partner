"use client";

import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  AssetsMetricCards,
  AssetsTable,
  UploadAssetModal,
  CreateFolderModal,
} from "@/components/assets";

import { Button } from "@/components/ui/button";

import { FolderPlus, Upload } from "lucide-react";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import AssetDetailsDrawer from "@/components/assets/AssetDetailsDrawer";

import { Asset } from "@/components/assets/types";

import Api from "@/utils/api";

interface AssetMetrics {
  audio?: {
    totalAssets?: number;
    publishedAssets?: number;
    draftAssets?: number;
    totalBuyers?: number;
    averagePrice?: number;
  };
  visual?: {
    totalAssets?: number;
    publishedAssets?: number;
    draftAssets?: number;
    totalBuyers?: number;
    averagePrice?: number;
  };
}

interface AssetsResponse {
  assets: Asset[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export default function AssetsPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [metrics, setMetrics] = useState<AssetMetrics | null>(null);

  const [assets, setAssets] = useState<Asset[]>([]);

  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingAssets, setLoadingAssets] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /**
   * ==========================
   * Fetch Asset Metrics
   * ==========================
   */
  const fetchAssetMetrics = useCallback(async () => {
    try {
      setLoadingMetrics(true);

      const response = await Api.get("/partner/assets/metrics");

      if (response.data?.success) {
        setMetrics(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch asset metrics:", error);
    } finally {
      setLoadingMetrics(false);
    }
  }, []);

  /**
   * ==========================
   * Fetch Assets
   * ==========================
   */
  const fetchAssets = useCallback(async () => {
    try {
      setLoadingAssets(true);
      setError(null);

      const response = await Api.get("/partner/assets");

      if (response.data?.success) {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setAssets(data);
        } else {
          setAssets(data?.assets || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);

      setError("Unable to load your assets. Please try again.");
    } finally {
      setLoadingAssets(false);
    }
  }, []);

  /**
   * ==========================
   * Initial Load
   * ==========================
   */
  useEffect(() => {
    fetchAssetMetrics();
    fetchAssets();
  }, [fetchAssetMetrics, fetchAssets]);

  /**
   * ==========================
   * Refresh Everything
   * ==========================
   */
  const refreshAssets = async () => {
    await Promise.all([fetchAssetMetrics(), fetchAssets()]);
  };

  /**
   * ==========================
   * View Asset
   * ==========================
   */
  const handleView = async (asset: Asset) => {
    try {
      setSelectedAsset(asset);
      setDrawerOpen(true);

      /**
       * If your Asset object contains type and id,
       * fetch the latest details from the API.
       */
      if (asset.type && asset.id) {
        const response = await Api.get(
          `/partner/assets/${asset.type}/${asset.id}`,
        );

        if (response.data?.success) {
          setSelectedAsset(
            response.data.data?.asset || response.data.data || asset,
          );
        }
      }
    } catch (error) {
      console.error("Failed to fetch asset details:", error);
    }
  };

  /**
   * ==========================
   * Edit Asset
   * ==========================
   *
   * There is currently no edit endpoint
   * in the backend routes.
   *
   * Keep the UI state ready for when
   * the endpoint is added.
   */
  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setEditOpen(true);
  };

  /**
   * ==========================
   * Delete Asset
   * ==========================
   */
  const handleDelete = (asset: Asset) => {
    setSelectedAsset(asset);
    setDeleteOpen(true);
  };

  /**
   * ==========================
   * Confirm Delete
   * ==========================
   */
  const handleConfirmDelete = async () => {
    if (!selectedAsset) return;

    try {
      /**
       * Your backend expects:
       *
       * DELETE /partner/assets/:type/:assetId
       */
      if (!selectedAsset.type || !selectedAsset.id) {
        console.error("Asset type or ID is missing.");
        return;
      }

      await Api.delete(
        `/partner/assets/${selectedAsset.type}/${selectedAsset.id}`,
      );

      setDeleteOpen(false);
      setDrawerOpen(false);
      setSelectedAsset(null);

      await refreshAssets();
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  /**
   * ==========================
   * Change Asset Status
   * ==========================
   */
  const handleStatusChange = async (
    asset: Asset,
    status: "published" | "draft",
  ) => {
    try {
      if (!asset.type || !asset.id) {
        console.error("Asset type or ID is missing.");
        return;
      }

      await Api.patch(`/partner/assets/${asset.type}/${asset.id}/status`, {
        status,
      });

      await refreshAssets();
    } catch (error) {
      console.error("Failed to update asset status:", error);
    }
  };

  return (
    <main className="flex-1">
      <div className="space-y-6">
        {/* ==========================
              Header
          =========================== */}
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Assets
            </h1>

            <p className="mt-2 text-gray-500">
              Upload, organize and manage all your digital assets.
            </p>
          </div>

          {/* <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setFolderOpen(true)}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>

            <Button
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setUploadOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Asset
            </Button>
          </div> */}
        </section>

        {/* ==========================
              Metrics
          =========================== */}
        <AssetsMetricCards data={metrics} loading={loadingMetrics} />

        {/* ==========================
              Error
          =========================== */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}

            <button
              onClick={fetchAssets}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* ==========================
              Assets Table
          =========================== */}
        <AssetsTable
          assets={assets}
          loading={loadingAssets}
          onUpload={() => setUploadOpen(true)}
          onCreateFolder={() => setFolderOpen(true)}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* ==========================
              Asset Details
          =========================== */}
        <AssetDetailsDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          asset={selectedAsset}
          onEdit={(asset) => {
            setSelectedAsset(asset);
            setEditOpen(true);
          }}
          onDelete={(asset) => {
            setSelectedAsset(asset);
            setDeleteOpen(true);
            setDrawerOpen(false);
          }}
          onDownload={(asset) => {
            console.log("Download", asset);
          }}
          onMove={(asset) => {
            console.log("Move", asset);
          }}
        />

        {/* ==========================
              Delete Confirmation
          =========================== */}
        <DeleteConfirmationDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          itemName={selectedAsset?.title}
          title="Delete Asset"
          description="Are you sure you want to permanently delete this asset?"
          onConfirm={handleConfirmDelete}
        />

        {/* ==========================
              Upload Modal
          =========================== */}
        <UploadAssetModal open={uploadOpen} onOpenChange={setUploadOpen} />

        {/* ==========================
              Folder Modal
          =========================== */}
        <CreateFolderModal open={folderOpen} onOpenChange={setFolderOpen} />
      </div>
    </main>
  );
}
