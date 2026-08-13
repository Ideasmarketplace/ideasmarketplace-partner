"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";
import NetworkToolbar from "./NetworkToolbar";
import { networkColumns } from "./NetworkColumns";
import { NetworkMember } from "./types";

import Api from "@/utils/api";

interface NetworkTableProps {
  onInvite: () => void;
  onView?: (member: NetworkMember) => void;
  onEdit?: (member: NetworkMember) => void;
  onDelete?: (member: NetworkMember) => void;
}

interface MembersResponse {
  success: boolean;
  members: NetworkMember[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function NetworkTable({
  onInvite,
  onView,
  onEdit,
  onDelete,
}: NetworkTableProps) {
  const [members, setMembers] = useState<NetworkMember[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    const fetchNetworkMembers = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(pageSize),
        });

        if (search.trim()) {
          params.append("search", search.trim());
        }

        if (status !== "all") {
          params.append("status", status);
        }

        const response = await Api.get<MembersResponse>(
          `/partner/members?${params.toString()}`
        );

        if (response.data?.success) {
          setMembers(response.data.members || []);

          setTotalItems(
            response.data.pagination?.total || 0
          );

          setTotalPages(
            response.data.pagination?.pages || 1
          );
        } else {
          setMembers([]);
          setTotalItems(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error(
          "Failed to fetch network members:",
          error
        );

        setMembers([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkMembers();
  }, [page, search, status]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <DataTable
        columns={networkColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={members}
        loading={loading}
        toolbar={
          <NetworkToolbar
            search={search}
            onSearchChange={handleSearchChange}
            status={status}
            onStatusChange={handleStatusChange}
            onInvite={onInvite}
          />
        }
        stickyHeader
        zebra
        emptyTitle="No Members Found"
        emptyDescription="Invite your first network member."
      />

      <div className="border-t border-gray-100 p-5">
        <DataTablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}