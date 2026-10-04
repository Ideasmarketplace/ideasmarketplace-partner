"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Report } from "./types";

import ReportPreview from "./ReportPreview";
import ReportMetadata from "./ReportMetadata";
import ReportActions from "./ReportActions";

interface ReportPreviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report?: Report | null;
  onPublish?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  onDelete?: (report: Report) => void;
}

export default function ReportPreviewDrawer({
  open,
  onOpenChange,
  report,
  onDownload,
}: ReportPreviewDrawerProps) {
  if (!report) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{report.title}</SheetTitle>
          <SheetDescription>
            Preview report details and manage this report.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <ReportPreview report={report} />
          <ReportMetadata report={report} />
          <ReportActions
            onDownload={() => onDownload?.(report)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}