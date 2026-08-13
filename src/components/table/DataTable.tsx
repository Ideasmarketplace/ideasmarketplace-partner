"use client";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

import { DataTableProps, SortState } from "./types";

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  toolbar,
  emptyTitle,
  emptyDescription,
  stickyHeader = true,
  zebra = false,
  onRowClick,
  sort,
  onSortChange,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden bg-white shadow-sm">
      {toolbar && <div className="border-b">{toolbar}</div>}

      <div className="max-h-[600px] w-full min-w-0 overflow-x-auto overflow-y-auto">
        <table className="min-w-[900px] w-full">
          <TableHead
            columns={columns}
            sticky={stickyHeader}
            sort={sort}
            onSortChange={onSortChange}
          />

          <TableBody
            columns={columns}
            data={data}
            loading={loading}
            zebra={zebra}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            onRowClick={onRowClick}
          />
        </table>
      </div>
    </div>
  );
}
