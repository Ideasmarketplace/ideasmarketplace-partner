"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Revenue } from "./types";

interface RevenuePreviewProps {
  revenue: Revenue;
}

export default function RevenuePreview({
  revenue,
}: RevenuePreviewProps) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-start gap-5">
        <Image
          src={revenue.assetThumbnail}
          alt={revenue.assetName}
          width={90}
          height={90}
          className="rounded-xl object-cover"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {revenue.assetName}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {revenue.reference}
              </p>
            </div>

            <Badge variant="secondary">
              {revenue.status}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Revenue
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                ${revenue.amount.toLocaleString()}
              </h2>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Source
              </p>

              <h3 className="mt-1 font-semibold">
                {revenue.source}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}