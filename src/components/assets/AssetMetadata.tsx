"use client";

import { Badge } from "@/components/ui/badge";
import MetadataRow from "../common/MetadataRow";
import { Asset } from "./types";

interface AssetMetadataProps {
  asset: Asset;
}

export default function AssetMetadata({ asset }: AssetMetadataProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">Asset Information</h3>

      <div className="grid gap-5">
        <MetadataRow label="Asset Name" value={asset.title} />

        <MetadataRow label="Category" value={asset.category} />

        <MetadataRow label="Folder" value={asset.folder} />

        <MetadataRow label="Visibility" value={asset.visibility} />

        <MetadataRow label="Size" value={asset.size} />

        <MetadataRow label="Created" value={asset.createdAt} />

        <MetadataRow label="Last Modified" value={asset.updatedAt} />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Tags</h4>

        <div className="flex flex-wrap gap-2">
          {asset?.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
