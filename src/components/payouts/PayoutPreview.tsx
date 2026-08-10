"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import StatusBadge from "@/components/table/StatusBadge";

import { Payout } from "./types";

interface PayoutPreviewProps {
  payout: Payout;
}

export default function PayoutPreview({
  payout,
}: PayoutPreviewProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Payout Amount
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ${payout.amount.toLocaleString()}
            </h2>
          </div>

          <StatusBadge status={payout.status} />
        </div>

        <div className="grid gap-4 rounded-xl bg-muted/40 p-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Net Amount
            </p>

            <p className="font-semibold">
              ${payout.netAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Processing Fee
            </p>

            <p className="font-semibold">
              ${payout.fee.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}