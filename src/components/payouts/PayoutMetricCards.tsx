"use client";

import { Wallet, Clock3, Landmark, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { payoutMetrics } from "./MockPayouts";
import { Button } from "../ui/button";

const metrics = [
  {
    title: "Available Balance",
    value: `$${payoutMetrics.availableBalance.toLocaleString()}`,
    subtitle: "Ready for withdrawal",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600",
    action: true,
  },
  {
    title: "Pending Balance",
    value: `$${payoutMetrics.pendingBalance.toLocaleString()}`,
    subtitle: "Awaiting settlement",
    icon: Clock3,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Total Paid Out",
    value: `$${payoutMetrics.totalPaidOut.toLocaleString()}`,
    subtitle: "Lifetime payouts",
    icon: Landmark,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Last Payout",
    value: `$${payoutMetrics.lastPayout.toLocaleString()}`,
    subtitle: "Most recent payout",
    icon: CreditCard,
    color: "bg-sky-100 text-sky-600",
  },
];

interface PayoutMetricCardsProps {
  onWithdraw: () => void;
}

export default function PayoutMetricCards({
  onWithdraw,
}: PayoutMetricCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.title} className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">{metric.value}</h3>

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
                <Button className="mt-6 w-full rounded-xl bg-indigo-600" onClick={onWithdraw}>
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
