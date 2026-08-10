"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import PayoutPreview from "./PayoutPreview";
import PayoutMetadata from "./PayoutMetadata";
import PayoutActions from "./PayoutActions";
import { Payout } from "./types";

interface PayoutPreviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  payout?: Payout | null;

  onReceipt?: (payout: Payout) => void;
  onExport?: (payout: Payout) => void;
  onDelete?: (payout: Payout) => void;
}

export default function PayoutPreviewDrawer({
  open,
  onOpenChange,
  payout,
  onReceipt,
  onExport,
  onDelete,
}: PayoutPreviewDrawerProps) {
  if (!payout) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{payout.reference}</SheetTitle>

          <SheetDescription>
            Review payout information and actions.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <PayoutPreview payout={payout} />

          <PayoutMetadata payout={payout} />

          <PayoutActions
            onReceipt={() => onReceipt?.(payout)}
            onExport={() => onExport?.(payout)}
            onDelete={() => onDelete?.(payout)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
