"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import RevenuePreview from "./RevenuePreview";
import RevenueMetadata from "./RevenueMetadata";
import RevenueActions from "./RevenueActions";

import { Revenue } from "./types";

interface RevenuePreviewDrawerProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  revenue?: Revenue | null;

  onExport?: (revenue: Revenue) => void;
}

export default function RevenuePreviewDrawer({
  open,
  onOpenChange,
  revenue,
  onExport,
}: RevenuePreviewDrawerProps) {
  if (!revenue) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Revenue Details</SheetTitle>

          <SheetDescription>
            View transaction information and manage this revenue record.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <RevenuePreview revenue={revenue} />

          <RevenueMetadata revenue={revenue} />

          <RevenueActions onExport={() => onExport?.(revenue)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
