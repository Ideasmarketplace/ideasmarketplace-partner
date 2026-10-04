"use client";

import {
  Pencil,
  UploadCloud,
  Download,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ReportActionsProps {
  onEdit?: () => void;

  onPublish?: () => void;

  onDownload?: () => void;

  onDelete?: () => void;

  isPublished?: boolean;

  isDownloading?: boolean;

  isPublishing?: boolean;

  isDeleting?: boolean;
}

export default function ReportActions({
  onDownload,
  isDownloading = false,
}: ReportActionsProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Actions
      </h3>

      <div className="space-y-3">
        <Button
          className="w-full justify-start"
          variant="secondary"
          onClick={onDownload}
          disabled={isDownloading}
        >
          <Download className="mr-2 h-4 w-4" />

          {isDownloading
            ? "Downloading..."
            : "Download Report"}
        </Button>
      </div>
    </div>
  );
}