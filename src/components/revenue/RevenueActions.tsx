"use client";

import {
  Download,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface RevenueActionsProps {
  onExport?: () => void;
}

export default function RevenueActions({
  onExport,
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
    </div>
  );
}