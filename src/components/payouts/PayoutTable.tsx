"use client";

import { useMemo, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";

import { mockPayouts } from "./MockPayouts";
import { payoutColumns } from "./PayoutColumns";
import PayoutToolbar from "./PayoutToolbar";
import { Payout } from "./types";

interface PayoutTableProps {
  onView?: (payout: Payout) => void;
  onEdit?: (payout: Payout) => void;
  onDelete?: (payout: Payout) => void;
  onExport?: () => void;
}

export default function PayoutTable({
  onView,
  onEdit,
  onDelete,
  onExport,
}: PayoutTableProps) {
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const totalPages = Math.ceil(
    mockPayouts.length / pageSize,
  );

  const payouts = useMemo(() => {
    const start = (page - 1) * pageSize;

    return mockPayouts.slice(start, start + pageSize);
  }, [page]);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
      <DataTable
        columns={payoutColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={payouts}
        toolbar={
          <PayoutToolbar
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
          currentPage={page}
          totalPages={totalPages}
          totalItems={mockPayouts.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}