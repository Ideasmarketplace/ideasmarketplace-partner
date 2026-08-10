"use client";

import { cn } from "@/lib/utils";
import { TableColumn } from "./types";

interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  zebra?: boolean;
  index: number;
  onRowClick?: (row: T) => void;
}

export default function TableRow<T extends Record<string, any>>({
  row,
  columns,
  zebra,
  index,
  onRowClick,
}: TableRowProps<T>) {
  return (
    <tr
      onClick={() => onRowClick?.(row)}
      className={cn(
        "border-b border-gray-100 transition-all duration-200",

        onRowClick &&
          "cursor-pointer hover:bg-indigo-50/40",

        zebra &&
          index % 2 === 1 &&
          "bg-gray-50/40"
      )}
    >
      {columns.map((column) => (
        <td
          key={column.id}
          style={{
            width: column.width,
          }}
          className={cn(
            "px-6 py-5 text-sm text-gray-700",

            column.align === "center" &&
              "text-center",

            column.align === "right" &&
              "text-right",

            column.className
          )}
        >
          {column.cell
            ? column.cell(row)
            : String(
                row[column.accessorKey as keyof T] ??
                  "-"
              )}
        </td>
      ))}
    </tr>
  );
}