"use client";

import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import UploadDropzone from "./UploadDropzone";
import AssetForm from "./AssetForm";

import {
  AssetFolder,
  AssetFormValues,
} from "./types";

interface UploadAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  folders?: AssetFolder[];

  onUpload?: (
    file: File,
    values: AssetFormValues
  ) => Promise<void> | void;
}

const DEFAULT_FORM: AssetFormValues = {
  title: "",
  description: "",
  category: "Visual",
  folder: "root",
  visibility: "Private",
  tags: [],
};

export default function UploadAssetModal({
  open,
  onOpenChange,
  folders = [],
  onUpload,
}: UploadAssetModalProps) {
  const [step, setStep] = useState(1);

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] =
    useState<AssetFormValues>(DEFAULT_FORM);

  const reset = () => {
    setStep(1);
    setFile(null);
    setForm(DEFAULT_FORM);
  };

  const handleFileSelected = (selected: File) => {
    setFile(selected);

    setForm({
      ...DEFAULT_FORM,
      title: selected.name.replace(/\.[^/.]+$/, ""),
      category: selected.type.startsWith("audio")
        ? "Audio"
        : "Visual",
    });

    setStep(2);
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await onUpload?.(file, form);

      reset();

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const canContinue = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.folder.length > 0
    );
  }, [form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) reset();

        onOpenChange(value);
      }}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Upload Asset
          </DialogTitle>

          <DialogDescription>
            Upload and organize your digital assets.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <UploadDropzone
            onSelect={handleFileSelected}
          />
        )}

        {step === 2 && (
          <AssetForm
            file={file}
            folders={folders}
            value={form}
            onChange={setForm}
          />
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep(1)}
          >
            Back
          </Button>

          {step === 2 && (
            <Button
              disabled={!canContinue || loading}
              onClick={handleSubmit}
            >
              {loading
                ? "Uploading..."
                : "Upload Asset"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}