
"use client";

import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export interface TopPerformingAsset {
  assetId: string;
  assetName: string;
  thumbnail: string | any;
  sales: number;
  revenue: number;
}

interface TopPerformingAssetsProps {
  data?: TopPerformingAsset[];
  loading?: boolean;
}

export default function TopPerformingAssets({
  data = [],
  loading = false,
}: TopPerformingAssetsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Top Performing Assets</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Assets generating the highest revenue
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          Top Earners
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-14 w-14 rounded-xl" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="ml-auto h-5 w-24" />
                  <Skeleton className="ml-auto h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No top performing assets available.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {data.map((asset, index) => (
              <div
                key={asset.assetId}
                className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                    {index + 1}
                  </div>

                  <Image
                    src={asset.thumbnail}
                    alt={asset.assetName}
                    width={56}
                    height={56}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {asset.assetName}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {asset.sales} sales
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    ₦{asset.revenue.toLocaleString()}
                  </p>

                  <div className="mt-1 flex items-center justify-end gap-1 text-sm text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    Revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
