"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import ActionMenu from "@/components/table/ActionMenu";
import StatusBadge from "@/components/table/StatusBadge";
import { TableColumn } from "@/components/table/types";

import { Payout } from "./types";

interface PayoutColumnProps {
  onView?: (payout: Payout) => void;
  onEdit?: (payout: Payout) => void;
  onDelete?: (payout: Payout) => void;
}

export function payoutColumns({
  onView,
  onEdit,
  onDelete,
}: PayoutColumnProps): TableColumn<Payout>[] {
  return [
    {
      id: "reference",
      header: "Reference",
      accessorKey: "reference",
    },

    {
      id: "bank",
      header: "Bank",

      cell: (row) => (
        <div>
          <p className="font-medium">
            {row.bankName}
          </p>

          <p className="text-xs text-muted-foreground">
            {row.accountNumber}
          </p>
        </div>
      ),
    },

    {
      id: "amount",
      header: "Amount",

      cell: (row) => (
        <span className="font-semibold">
          ${row.amount.toLocaleString()}
        </span>
      ),
    },

    {
      id: "fee",
      header: "Fee",

      cell: (row) => `$${row.fee.toLocaleString()}`,
    },

    {
      id: "netAmount",
      header: "Net",

      cell: (row) => (
        <span className="font-semibold text-emerald-600">
          ${row.netAmount.toLocaleString()}
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
      id: "requestedAt",
      header: "Requested",
      accessorKey: "requestedAt",
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