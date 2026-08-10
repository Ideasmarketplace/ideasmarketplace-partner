"use client";

import TableRow from "./TableRow";
import TableEmpty from "./TableEmpty";
import TableSkeleton from "./TableSkeleton";

import { TableColumn } from "./types";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  zebra?: boolean;
  onRowClick?: (row: T) => void;
}

export default function TableBody<T extends Record<string, any>>({
  data,
  columns,
  loading,
  emptyTitle,
  emptyDescription,
  zebra,
  onRowClick,
}: TableBodyProps<T>) {
  if (loading) {
    return (
      <TableSkeleton
        rows={8}
        columns={columns.length}
      />
    );
  }

  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length}>
            <TableEmpty
              title={emptyTitle}
              description={emptyDescription}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow
          key={index}
          row={row}
          index={index}
          columns={columns}
          zebra={zebra}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
}