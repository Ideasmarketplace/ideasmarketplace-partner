"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { SortState, TableColumn } from "./types";

interface TableHeadProps<T> {
  columns: TableColumn<T>[];

  sticky?: boolean;

  sort?: SortState<T>;

  onSortChange?: (sort: SortState<T>) => void;
}

export default function TableHead<T>({
  columns,
  sticky,
  sort,
  onSortChange,
}: TableHeadProps<T>) {
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return;

    const direction =
      sort?.column === column.id && sort.direction === "asc" ? "desc" : "asc";

    onSortChange({
      column: column.id,
      direction,
    });
  };

  return (
    <thead className={cn("bg-gray-50", sticky && "sticky top-0 z-20")}>
      <tr>
        {columns.map((column) => {
          const active = sort?.column === column.id;

          return (
            <th
              key={column.id}
              style={{
                width: column.width,
              }}
              aria-sort={
                active
                  ? sort?.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className={cn(
                "whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500",
                column.headerClassName,
              )}
            >
              <button
                disabled={!column.sortable}
                onClick={() => handleSort(column)}
                className={cn(
                  "flex items-center gap-2",
                  column.sortable && "transition hover:text-gray-900",
                )}
              >
                {column.header}

                {column.sortable &&
                  (active ? (
                    sort?.direction === "asc" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  ))}
              </button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
