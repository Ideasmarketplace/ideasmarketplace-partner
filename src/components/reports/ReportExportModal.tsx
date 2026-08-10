"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportExportModalProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onExport?: (
    format: "pdf" | "csv" | "xlsx"
  ) => Promise<void> | void;
}

export default function ReportExportModal({
  open,
  onOpenChange,
  onExport,
}: ReportExportModalProps) {
  const [format, setFormat] = useState<
    "pdf" | "csv" | "xlsx"
  >("pdf");

  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    await onExport?.(format);

    setLoading(false);

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Export Reports
          </DialogTitle>

          <DialogDescription>
            Choose the export format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Select
            value={format}
            onValueChange={(v) =>
              setFormat(v as any)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="pdf">
                PDF
              </SelectItem>

              <SelectItem value="csv">
                CSV
              </SelectItem>

              <SelectItem value="xlsx">
                Excel (.xlsx)
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleExport}
            disabled={loading}
          >
            {loading
              ? "Exporting..."
              : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}