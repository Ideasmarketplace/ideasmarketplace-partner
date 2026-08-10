"use client";

import Image from "next/image";

import { Eye, Pencil, Trash2 } from "lucide-react";

import { TableColumn } from "@/components/table/types";
import ActionMenu from "@/components/table/ActionMenu";
import StatusBadge from "@/components/table/StatusBadge";

import { NetworkMember } from "./types";

interface NetworkColumnActions {
  onView?: (member: NetworkMember) => void;
  onEdit?: (member: NetworkMember) => void;
  onDelete?: (member: NetworkMember) => void;
}

export const networkColumns = ({
  onView,
  onEdit,
  onDelete,
}: NetworkColumnActions): TableColumn<NetworkMember>[] => [
  {
    id: "member",
    header: "Member",
    width: "300px",

    cell: (row) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.avatar}
          alt={`${row.firstName} ${row.lastName}`}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-gray-900">
            {row.firstName} {row.lastName}
          </p>

          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      </div>
    ),
  },

//   {
//     id: "role",
//     header: "Role",

//     cell: (row) => <span className="font-medium">{row.role}</span>,
//   },

  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },

  {
    id: "assetsManaged",
    header: "Assets",

    cell: (row) => row.assetsManaged,
  },

  {
    id: "revenueGenerated",
    header: "Revenue",

    cell: (row) => `$${row.revenueGenerated.toLocaleString()}`,
  },

  {
    id: "lastActive",
    header: "Last Active",
    accessorKey: "lastActive",
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
