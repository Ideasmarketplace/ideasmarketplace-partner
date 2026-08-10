"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import ActionMenu from "@/components/table/ActionMenu";
import { TableColumn } from "@/components/table/types";
import { Revenue } from "./types";
import StatusBadge from "../table/StatusBadge";

interface RevenueColumnProps {
  onView?: (revenue: Revenue) => void;
  onEdit?: (revenue: Revenue) => void;
  onDelete?: (revenue: Revenue) => void;
}

export function revenueColumns({
  onView,
  onEdit,
  onDelete,
}: RevenueColumnProps): TableColumn<Revenue>[] {
  return [
    {
      id: "asset",

      header: "Asset",

      width: "280px",

      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.assetThumbnail}
            alt={row.assetName}
            width={48}
            height={48}
            className="rounded-xl object-cover"
          />

          <div>
            <p className="font-semibold">
              {row.assetName}
            </p>

            <p className="text-sm text-muted-foreground">
              {row.reference}
            </p>
          </div>
        </div>
      ),
    },

    {
      id: "customer",

      header: "Customer",

      accessorKey: "customer",
    },

    {
      id: "source",

      header: "Source",

      accessorKey: "source",
    },

    {
      id: "amount",

      header: "Amount",

      cell: (row) => (
        <span className="font-semibold">
          ₦{row.amount.toLocaleString()}
        </span>
      ),
    },

    {
      id: "status",

      header: "Status",

      cell: (row) => (
        <StatusBadge status={row.status} />
      ),
    },

    {
      id: "date",

      header: "Date",

      accessorKey: "transactionDate",
    },

    {
      id: "actions",

      header: "",

      align: "right",

      cell: (row) => (
        <ActionMenu
          row={row}
          actions={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              onClick: () => onView?.(row),
            },
            {
              label: "Edit",
              icon: <Pencil className="h-4 w-4" />,
              onClick: () => onEdit?.(row),
            },
            {
              label: "Delete",
              destructive: true,
              icon: <Trash2 className="h-4 w-4" />,
              onClick: () => onDelete?.(row),
            },
          ]}
        />
      ),
    },
  ];
}