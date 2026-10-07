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
}

export function payoutColumns({
  onView,
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
          ₦{row.amount.toLocaleString()}
        </span>
      ),
    },

    {
      id: "fee",
      header: "Fee",

      cell: (row) => `₦${row.fee.toLocaleString()}`,
    },

    {
      id: "netAmount",
      header: "Net",

      cell: (row) => (
        <span className="font-semibold text-emerald-600">
          ₦{row.netAmount.toLocaleString()}
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
      id: "createdAt",
      header: "Requested",
      accessorKey: "createdAt",
      cell: (row) => {
        const date = new Date(row?.createdAt);

        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Africa/Lagos",
        }).format(date);
      },
    },

    // {
    //   id: "actions",
    //   header: "",
    //   align: "right",

    //   cell: (row) => (
    //     <ActionMenu
    //       row={row}
    //       actions={[
    //         {
    //           label: "View",
    //           icon: <Eye className="h-4 w-4" />,
    //           onClick: () => onView?.(row),
    //         },
    //       ]}
    //     />
    //   ),
    // },
  ];
}