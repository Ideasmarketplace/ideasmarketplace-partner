"use client";

import {
  Wallet,
  Clock3,
  Landmark,
  CreditCard,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface PayoutSummary {
  availableBalance: number;
  pendingBalance: number;
  totalPaidOut: number;
  lastPayout: number;
}

interface PayoutMetricCardsProps {
  data?: PayoutSummary | null;
  loading?: boolean;
  onWithdraw: () => void;
}

export default function PayoutMetricCards({
  data,
  loading = false,
  onWithdraw,
}: PayoutMetricCardsProps) {
  const metrics = [
    {
      title: "Available Balance",
      value: data?.availableBalance ?? 0,
      subtitle: "Ready for withdrawal",
      icon: Wallet,
      color: "bg-emerald-100 text-emerald-600",
      action: true,
    },
    {
      title: "Pending Balance",
      value: data?.pendingBalance ?? 0,
      subtitle: "Awaiting settlement",
      icon: Clock3,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Total Paid Out",
      value: data?.totalPaidOut ?? 0,
      subtitle: "Lifetime payouts",
      icon: Landmark,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Last Payout",
      value: data?.lastPayout ?? 0,
      subtitle: "Most recent payout",
      icon: CreditCard,
      color: "bg-sky-100 text-sky-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card
            key={metric.title}
            className="rounded-3xl shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>

                  {loading ? (
                    <Skeleton className="mt-2 h-9 w-32" />
                  ) : (
                    <h3 className="mt-2 text-3xl font-bold">
                      ${metric.value.toLocaleString()}
                    </h3>
                  )}

                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.subtitle}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${metric.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              {metric.action && (
                <Button
                  className="mt-6 w-full rounded-xl bg-indigo-600"
                  onClick={onWithdraw}
                  disabled={loading}
                >
                  Withdraw Funds
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
