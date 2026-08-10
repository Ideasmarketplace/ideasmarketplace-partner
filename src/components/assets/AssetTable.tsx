"use client";

import { useMemo, useState } from "react";

import DataTable from "@/components/table/DataTable";
import { assetColumns } from "./AssetColumns";
import DataTablePagination from "../table/DataTablePagination";
import AssetsToolbar from "./AssetToolbar";
import { Asset } from "./types";

interface AssetsTableProps {
  assets: Asset[];

  loading?: boolean;

  onUpload: () => void;
  onCreateFolder: () => void;

  onView?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

export default function AssetsTable({
  assets,
  loading = false,
  onUpload,
  onCreateFolder,
  onView,
  onEdit,
  onDelete,
}: AssetsTableProps) {
  const [page, setPage] = useState(1);

  const pageSize = 10;

  /**
   * ==========================
   * Pagination
   * ==========================
   */

  const totalItems = assets.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize),
  );

  const paginatedAssets = useMemo(() => {
    const start = (page - 1) * pageSize;

    return assets.slice(
      start,
      start + pageSize,
    );
  }, [assets, page]);

  /**
   * Reset to page 1 if the
   * current page becomes invalid
   * after refreshing the API data.
   */
  useMemo(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

      <DataTable
        columns={assetColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={paginatedAssets}
        toolbar={
          <AssetsToolbar
            onUpload={onUpload}
            onCreateFolder={onCreateFolder}
          />
        }
        stickyHeader
        zebra
        loading={loading}
        emptyTitle="No Assets Found"
        emptyDescription="Upload your first digital asset."
      />

      {!loading && totalItems > 0 && (
        <div className="border-t border-gray-100 p-5">
          <DataTablePagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
