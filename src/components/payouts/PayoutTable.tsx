"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";

import { payoutColumns } from "./PayoutColumns";
import PayoutToolbar from "./PayoutToolbar";
import { Payout } from "./types";

interface PayoutTableProps {
  data?: Payout[];
  loading?: boolean;

  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;

  onPageChange?: (page: number) => void;

  onView?: (payout: Payout) => void;
  onEdit?: (payout: Payout) => void;
  onDelete?: (payout: Payout) => void;
  onExport?: () => void;
}

export default function PayoutTable({
  data = [],
  loading = false,

  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,

  onPageChange,

  onView,
  onEdit,
  onDelete,
  onExport,
}: PayoutTableProps) {
  const [search, setSearch] = useState("");

  const filteredPayouts = data.filter((payout) => {
    if (!search.trim()) return true;

    const searchValue = search.toLowerCase();

    return (
      payout.reference
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="space-y-0">
      <DataTable
        columns={payoutColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={filteredPayouts}
        toolbar={
          <PayoutToolbar
            search={search}
            onSearchChange={setSearch}
            onExport={onExport}
          />
        }
        stickyHeader
        zebra
        emptyTitle="No payouts found"
        emptyDescription="Your payout history will appear here."
      />

      <div className="border-t border-gray-100 p-5">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange || (() => {})}
        />
      </div>
    </div>
  );
}
