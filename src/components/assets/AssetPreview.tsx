"use client";

import Image from "next/image";
import {
  FileAudio,
  FileVideo,
  FileImage,
  FileText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Asset } from "./types";

interface AssetPreviewProps {
  asset: Asset;
}

export default function AssetPreview({
  asset,
}: AssetPreviewProps) {
  const renderPreview = () => {
    // Image
    if (
      asset.thumbnail &&
      asset.category === "Visual"
    ) {
      return (
        <div className="relative h-72 overflow-hidden rounded-2xl">
          <Image
            src={asset.thumbnail}
            alt={asset.title}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    // Audio
    if (asset.category === "Audio") {
      return (
        <div className="flex flex-col items-center rounded-2xl border bg-slate-50 py-10">
          <FileAudio className="mb-4 h-16 w-16 text-indigo-600" />

          <audio
            controls
            className="w-full max-w-sm"
          >
            <source
              src={asset.url}
              type="audio/mpeg"
            />
          </audio>
        </div>
      );
    }

    // Video
    if (asset.type === "video") {
      return (
        <div className="rounded-2xl border bg-black">
          <video
            controls
            className="w-full rounded-2xl"
          >
            <source src={asset.url} />
          </video>
        </div>
      );
    }

    // Generic File
    return (
      <div className="flex flex-col items-center rounded-2xl border py-10">
        <FileText className="mb-4 h-16 w-16 text-gray-500" />

        <p className="font-medium">
          Preview unavailable
        </p>
      </div>
    );
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <Badge>{asset.category}</Badge>

        <Badge variant="secondary">
          {asset.extension}
        </Badge>
      </div>

      {renderPreview()}
    </section>
  );
}