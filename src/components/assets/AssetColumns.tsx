"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2, Music4, ImageIcon } from "lucide-react";

import { TableColumn } from "@/components/table/types";
import ActionMenu from "@/components/table/ActionMenu";
import { Asset } from "./types"; // <-- import from your types file

interface AssetColumnActions {
  onView?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

export const assetColumns = ({
  onView,
  onEdit,
  onDelete,
}: AssetColumnActions): TableColumn<Asset>[] => [
  {
    id: "asset",
    header: "Asset",
    width: "280px",

    cell: (row) => (
      <div
        className="flex min-w-0 cursor-pointer items-center gap-4"
        onClick={() => onView?.(row)}
      >
        <Image
          src={row.thumbnail}
          alt={row.name}
          width={56}
          height={56}
          className="rounded-xl object-cover max-h-10"
        />

        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{row.name}</p>

          <p className="truncate text-sm text-gray-500">#{row.id}</p>
        </div>
      </div>
    ),
  },

  {
    id: "title",
    header: "Title",
    accessorKey: "title",
  },

  {
    id: "category",
    header: "Category",

    cell: (row) => (
      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium">
        {row.category === "Audio" ? (
          <Music4 className="h-4 w-4 text-indigo-600" />
        ) : (
          <ImageIcon className="h-4 w-4 text-pink-600" />
        )}

        {row.category}
      </div>
    ),
  },

  {
    id: "createdAt",
    header: "Created",
    accessorKey: "createdAt",
  },

  {
    id: "updatedAt",
    header: "Last Modified",
    accessorKey: "updatedAt",
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
