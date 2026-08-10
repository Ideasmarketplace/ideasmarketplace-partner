"use client";

import Image from "next/image";

import { Eye, Pencil, Trash2, UploadCloud, FileText } from "lucide-react";

import ActionMenu from "@/components/table/ActionMenu";
import { TableColumn } from "@/components/table/types";
import ReportStatusBadge from "./ReportStatusBadge";
import { Report } from "./types";

interface ReportColumnActions {
  onView?: (report: Report) => void;
  onEdit?: (report: Report) => void;
  onPublish?: (report: Report) => void;
  onDelete?: (report: Report) => void;
}

export function ReportColumns({
  onView,
  onEdit,
  onPublish,
  onDelete,
}: ReportColumnActions): TableColumn<Report>[] {
  return [
    {
      id: "report",
      header: "Report",
      width: "340px",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Image
            src={row.thumbnail}
            alt={row.title}
            width={56}
            height={56}
            className="rounded-xl object-cover"
          />

          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">{row.title}</p>

            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {row.description}
            </p>
          </div>
        </div>
      ),
    },

    {
      id: "status",
      header: "Status",
      cell: (row) => <ReportStatusBadge status={row.status} />,
    },

    {
      id: "author",
      header: "Author",
      accessorKey: "author",
    },

    {
      id: "category",
      header: "Category",

      cell: (row) => (
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium">
          <FileText className="h-4 w-4 text-indigo-600" />
          {row.category}
        </div>
      ),
    },

    // {
    //   id: "views",
    //   header: "Views",
    //   cell: (row) => (
    //     <span className="font-medium">{row.views.toLocaleString()}</span>
    //   ),
    // },

    {
      id: "downloads",
      header: "Downloads",
      cell: (row) => (
        <span className="font-medium">{row.downloads.toLocaleString()}</span>
      ),
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
              label: "Publish",
              icon: <UploadCloud className="h-4 w-4" />,
              onClick: () => onPublish?.(row),
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
