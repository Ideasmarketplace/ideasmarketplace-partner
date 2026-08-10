"use client";

import {
  Pencil,
  Download,
  FolderInput,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AssetActionsProps {
  onEdit?: () => void;
  onDownload?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

export default function AssetActions({
  onEdit,
  onDownload,
  onMove,
  onDelete,
}: AssetActionsProps) {
  return (
    <section className="space-y-5">
      <h3 className="text-lg font-semibold">
        Actions
      </h3>

      <Separator />

      <div className="grid gap-3">
        <Button
          variant="outline"
          className="justify-start"
          onClick={onEdit}
        >
          <Pencil className="mr-3 h-4 w-4" />
          Edit Asset
        </Button>

        <Button
          variant="outline"
          className="justify-start"
          onClick={onDownload}
        >
          <Download className="mr-3 h-4 w-4" />
          Download
        </Button>

        <Button
          variant="outline"
          className="justify-start"
          onClick={onMove}
        >
          <FolderInput className="mr-3 h-4 w-4" />
          Move to Folder
        </Button>

        <Button
          variant="destructive"
          className="justify-start"
          onClick={onDelete}
        >
          <Trash2 className="mr-3 h-4 w-4" />
          Delete Asset
        </Button>
      </div>
    </section>
  );
}