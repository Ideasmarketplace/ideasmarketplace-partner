"use client";

import {
  Download,
  Trash2,
  Receipt,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PayoutActionsProps {
  onReceipt?: () => void;
  onExport?: () => void;
  onDelete?: () => void;
}

export default function PayoutActions({
  onReceipt,
  onExport,
  onDelete,
}: PayoutActionsProps) {
  return (
    <div className="space-y-3">
      <Button
        className="w-full justify-start"
        onClick={onReceipt}
      >
        <Receipt className="mr-2 h-4 w-4" />
        View Receipt
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onExport}
      >
        <Download className="mr-2 h-4 w-4" />
        Export Details
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