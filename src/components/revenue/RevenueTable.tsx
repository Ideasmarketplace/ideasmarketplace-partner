"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";

import RevenueToolbar from "./RevenueToolbar";
import { revenueColumns } from "./RevenueColumns";
import { Revenue } from "./types";

import Api from "@/utils/api";

interface RevenueTableProps {
  onExport?: () => void;
  onView?: (revenue: Revenue) => void;
  onEdit?: (revenue: Revenue) => void;
  onDelete?: (revenue: Revenue) => void;
}

interface RevenueResponse {
  success: boolean;
  data?: {
    transactions: Revenue[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  message?: string;
}

export default function RevenueTable({
  onExport,
  onView,
  onEdit,
  onDelete,
}: RevenueTableProps) {
  const [revenue, setRevenue] = useState<Revenue[]>([]);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const pageSize = 10;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: pageSize,
    total: 0,
    pages: 1,
  });

  /**
   * Fetch revenue transactions
   */
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);

        const response = await Api.get<RevenueResponse>(
          `partner/revenue?page=${page}&limit=${pageSize}&search=${encodeURIComponent(
            search,
          )}`,
        );

        if (response.data?.success) {
          const result = response.data.data;

          setRevenue(result?.transactions || []);

          setPagination(
            result?.pagination || {
              page,
              limit: pageSize,
              total: 0,
              pages: 1,
            },
          );
        } else {
          setRevenue([]);
        }
      } catch (error) {
        console.error("Failed to fetch revenue transactions:", error);

        setRevenue([]);

        setPagination({
          page,
          limit: pageSize,
          total: 0,
          pages: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [page, search]);

  /**
   * Reset pagination when search changes
   */
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <DataTable
        columns={revenueColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={revenue}
        toolbar={<RevenueToolbar onExport={onExport} />}
        loading={loading}
        stickyHeader
        zebra
        emptyTitle="No Revenue Found"
        emptyDescription="Revenue transactions will appear here."
      />

      {!loading && pagination.total > 0 && (
        <div className="border-t border-gray-100 p-5">
          <DataTablePagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            totalItems={pagination.total}
            pageSize={pagination.limit}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
