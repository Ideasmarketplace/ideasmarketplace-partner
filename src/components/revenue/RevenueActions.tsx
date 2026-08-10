"use client";

import {
  Download,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface RevenueActionsProps {
  onExport?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;
}

export default function RevenueActions({
  onExport,
  onEdit,
  onDelete,
}: RevenueActionsProps) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onExport}
      >
        <Download className="mr-2 h-4 w-4" />

        Export Transaction
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onEdit}
      >
        <Pencil className="mr-2 h-4 w-4" />

        Edit Record
      </Button>

      <Button
        variant="destructive"
        className="w-full justify-start"
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" />

        Delete Record
      </Button>
    </div>
  );
}