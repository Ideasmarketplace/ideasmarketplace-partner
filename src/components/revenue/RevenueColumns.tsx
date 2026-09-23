"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

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
          {/* <Image
            src={row.assetThumbnail}
            alt={row.itemTitle}
            width={48}
            height={48}
            className="rounded-xl object-cover"
          /> */}

          <div>
            <p className="font-semibold">{row.itemTitle}</p>

            <p className="text-sm text-muted-foreground">{row.reference}</p>
          </div>
        </div>
      ),
    },

    {
      id: "customer",

      header: "Customer",

      accessorKey: "buyerName",
    },

    {
      id: "source",
      width: "150px",

      header: "Source",

      accessorKey: "itemType",
    },

    {
      id: "amount",

      header: "Amount",

      cell: (row) => (
        <span className="font-semibold">₦{row.amount.toLocaleString()}</span>
      ),
    },

    {
      id: "status",

      header: "Status",

      cell: (row) => <StatusBadge status={row?.status} />,
    },

    {
      id: "date",
      header: "Date",
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
