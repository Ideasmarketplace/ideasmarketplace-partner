"use client";

import { useMemo, useState } from "react";

import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";

import NetworkToolbar from "./NetworkToolbar";

import { networkColumns } from "./NetworkColumns";

import { mockMembers } from "./MockMembers";
import { NetworkMember } from "./types";

interface NetworkTableProps {
  onInvite: () => void;

  onView?: (member: NetworkMember) => void;
  onEdit?: (member: NetworkMember) => void;
  onDelete?: (member: NetworkMember) => void;
}

export default function NetworkTable({
  onInvite,
  onView,
  onEdit,
  onDelete,
}: NetworkTableProps) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const [status, setStatus] = useState("all");

  const pageSize = 10;

  const filteredMembers = useMemo(() => {
    return mockMembers.filter((member) => {
      const matchesSearch =
        `${member.firstName} ${member.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        role === "all" ||
        member.role === role;

      const matchesStatus =
        status === "all" ||
        member.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [search, role, status]);

  const totalPages = Math.ceil(
    filteredMembers.length / pageSize
  );

  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredMembers.slice(
      start,
      start + pageSize
    );
  }, [filteredMembers, page]);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
      <DataTable
        columns={networkColumns({
          onView,
          onEdit,
          onDelete,
        })}
        data={paginatedMembers}
        toolbar={
          <NetworkToolbar
            search={search}
            onSearchChange={setSearch}
            role={role}
            onRoleChange={setRole}
            status={status}
            onStatusChange={setStatus}
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
          totalItems={filteredMembers.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}