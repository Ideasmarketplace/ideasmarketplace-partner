"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadDropzoneProps {
  onSelect: (file: File) => void;
}

export default function UploadDropzone({
  onSelect,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;

    onSelect(files[0]);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-14 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
    >
      <UploadCloud className="mx-auto mb-5 h-14 w-14 text-indigo-500" />

      <h3 className="text-xl font-semibold">
        Drag & Drop your file
      </h3>

      <p className="mt-2 text-gray-500">
        Audio or Visual assets
      </p>

      <Button
        type="button"
        className="mt-6"
        onClick={openPicker}
      >
        Browse Files
      </Button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*,audio/*,video/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="mt-8 flex justify-center gap-3 text-sm text-gray-500">
        <span>PNG</span>
        <span>JPG</span>
        <span>MP4</span>
        <span>MP3</span>
        <span>WAV</span>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Maximum upload size: 50 MB
      </p>
    </div>
  );
}