"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import AssetForm from "./AssetForm";
import { Asset, AssetFormValues } from "./types";

interface EditAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  asset?: Asset | null;

  onSave?: (values: AssetFormValues) => void;
}

export default function EditAssetModal({
  open,
  onOpenChange,
  asset,
  onSave,
}: EditAssetModalProps) {
  const [form, setForm] = useState<AssetFormValues>({
    title: "",
    description: "",
    category: "Visual",
    folder: "",
    visibility: "Private",
    tags: [],
  });

  useEffect(() => {
    if (!asset) return;

    setForm({
      title: asset.title,
      description: asset.description ?? "",
      category: asset.category,
      folder: asset.folder || "",
      visibility: asset.visibility || "Public",
      tags: asset.tags,
    });
  }, [asset]);

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>

          <DialogDescription>Update your asset information.</DialogDescription>
        </DialogHeader>

        <AssetForm file={null} value={form} onChange={setForm} />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={() => onSave?.(form)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
