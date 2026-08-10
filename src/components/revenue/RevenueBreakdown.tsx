"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export interface RevenueBreakdownItem {
  source: string;
  amount: number;
  percentage: number;
}

interface RevenueBreakdownProps {
  data?: RevenueBreakdownItem[];
  loading?: boolean;
}

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

function RevenueBreakdownSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Chart */}
      <div className="flex h-64 items-center justify-center">
        <div className="h-48 w-48 rounded-full border-[32px] border-gray-200" />
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-gray-200" />

              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>

            <div className="space-y-1 text-right">
              <div className="ml-auto h-4 w-20 rounded bg-gray-200" />

              <div className="ml-auto h-3 w-10 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="h-6 w-28 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function RevenueBreakdown({
  data = [],
  loading = false,
}: RevenueBreakdownProps) {
  const totalRevenue = data.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Revenue Breakdown</CardTitle>

        <p className="text-sm text-muted-foreground">
          Revenue by source
        </p>
      </CardHeader>

      <CardContent>
        {loading ? (
          <RevenueBreakdownSkeleton />
        ) : data.length === 0 ? (
          <div className="flex h-[420px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No revenue breakdown available.
            </p>
          </div>
        ) : (
          <>
            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="source"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {data.map((item, index) => (
                      <Cell
                        key={`${item.source}-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Revenue",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown */}
            <div className="mt-6 space-y-4">
              {data.map((item, index) => (
                <div
                  key={`${item.source}-${index}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="text-sm font-medium">
                      {item.source}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(item.amount)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Total Revenue
                </span>

                <span className="text-lg font-bold">
                  {formatCurrency(totalRevenue)}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
