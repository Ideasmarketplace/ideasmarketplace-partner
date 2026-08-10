"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RevenueChartItem } from "./types";

import Api from "@/utils/api";

type RevenuePeriod = "7d" | "30d" | "90d" | "6m" | "1y";


interface RevenueChartProps {
  data?: RevenueChartItem[];
  loading?: boolean;
}

interface RevenueChartResponse {
  data?: RevenueChartItem[];
  totalRevenue?: number;
  change?: number;
}

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

function ChartSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Summary */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="mt-3 h-9 w-40 rounded bg-gray-200" />
        </div>

        <div className="h-8 w-20 rounded-full bg-gray-200" />
      </div>

      {/* Chart */}
      <div className="h-80 rounded-2xl bg-gray-100" />
    </div>
  );
}

export default function RevenueChart({
  data: initialData = [],
  loading: initialLoading = false,
}: RevenueChartProps) {
  const [period, setPeriod] = useState<RevenuePeriod>("6m");

  const [data, setData] =
    useState<RevenueChartItem[]>(initialData);

  const [loading, setLoading] =
    useState<boolean>(initialLoading);

  const [totalRevenue, setTotalRevenue] =
    useState<number>(0);

  const [change, setChange] =
    useState<number | null>(null);

  useEffect(() => {
    const fetchRevenueChart = async () => {
      setLoading(true);

      try {
        const response = await Api.get(
          `partner/revenue/chart?period=${period}`,
        );

        if (!response.data?.success) {
          setData([]);
          setTotalRevenue(0);
          setChange(null);
          return;
        }

        const responseData: RevenueChartResponse | RevenueChartItem[] =
          response.data.data;

        if (Array.isArray(responseData)) {
          setData(responseData);

          const total = responseData.reduce(
            (sum, item) => sum + (item.revenue || 0),
            0,
          );

          setTotalRevenue(total);
          setChange(null);
        } else {
          const chartData = responseData?.data || [];

          setData(chartData);

          /*
           * If backend provides totalRevenue,
           * use it. Otherwise calculate it.
           */
          const total =
            responseData.totalRevenue ??
            chartData.reduce(
              (sum, item) => sum + (item.revenue || 0),
              0,
            );

          setTotalRevenue(total);

          setChange(
            responseData.change !== undefined
              ? responseData.change
              : null,
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch revenue chart:",
          error,
        );

        setData([]);
        setTotalRevenue(0);
        setChange(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueChart();
  }, [period]);

  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <CardTitle>Revenue Trend</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Revenue generated over time
          </p>
        </div>

        <Select
          value={period}
          onValueChange={(value) =>
            setPeriod(value as RevenuePeriod)
          }
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="7d">
              7 Days
            </SelectItem>

            <SelectItem value="30d">
              30 Days
            </SelectItem>

            <SelectItem value="90d">
              90 Days
            </SelectItem>

            <SelectItem value="6m">
              6 Months
            </SelectItem>

            <SelectItem value="1y">
              1 Year
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ChartSkeleton />
        ) : (
          <>
            {/* Summary */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Revenue
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {formatCurrency(totalRevenue)}
                </h2>
              </div>

              {change !== null && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                  <TrendingUp className="h-4 w-4" />

                  {change > 0 ? "+" : ""}
                  {change}%
                </div>
              )}
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
              <div className="flex h-80 items-center justify-center rounded-2xl bg-gray-50">
                <p className="text-sm text-gray-500">
                  No revenue data available for this period.
                </p>
              </div>
            ) : (
              /* Chart */
              <div className="h-80">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4F46E5"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="95%"
                          stopColor="#4F46E5"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      tickFormatter={(value) =>
                        `₦${value / 1000}k`
                      }
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      formatter={(value: number) => [
                        formatCurrency(value),
                        "Revenue",
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4F46E5"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
