"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import AssetPreview from "./AssetPreview";
import AssetMetadata from "./AssetMetadata";
import AssetActions from "./AssetActions";
import { Asset } from "./types";

interface AssetDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  asset?: Asset | null;

  onEdit?: (asset: Asset) => void;
  onDownload?: (asset: Asset) => void;
  onMove?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

export default function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  onEdit,
  onDownload,
  onMove,
  onDelete,
}: AssetDetailsDrawerProps) {
  if (!asset) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{asset.title}</SheetTitle>

          <SheetDescription>
            View asset details and manage this asset.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <AssetPreview asset={asset} />

          <AssetMetadata asset={asset} />

          <AssetActions
            onEdit={() => onEdit?.(asset)}
            onDownload={() => onDownload?.(asset)}
            onMove={() => onMove?.(asset)}
            onDelete={() => onDelete?.(asset)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}