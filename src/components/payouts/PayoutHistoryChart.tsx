"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { payoutHistory } from "./MockPayouts";

export default function PayoutHistoryChart() {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle>Payout History</CardTitle>

        <p className="text-sm text-muted-foreground">
          Monthly payouts sent to your connected bank account.
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoutHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Payout",
                ]}
              />

              <Line
                type="monotone"
                dataKey="amount"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
