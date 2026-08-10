"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

type Period = "weekly" | "monthly" | "yearly";

interface MonthlyRevenue {
  month: string;
  totalCommission: number;
}

interface EarningsChartProps {
  monthlyRevenue?: MonthlyRevenue[];
  totalEarnings?: number;
}

export default function EarningsChart({
  monthlyRevenue = [],
  totalEarnings = 0,
}: EarningsChartProps) {
  const [period, setPeriod] = useState<Period>("monthly");

  /**
   * Transform API data into the format expected
   * by Recharts.
   *
   * The current dashboard API provides monthly revenue,
   * so weekly/yearly are currently derived from the
   * available monthly data.
   */
  const data = useMemo(() => {
    if (!monthlyRevenue.length) {
      return [];
    }

    if (period === "monthly") {
      return monthlyRevenue.map((item) => ({
        name: item.month.slice(0, 3),
        earnings: Number(item.totalCommission ?? 0),
      }));
    }

    if (period === "yearly") {
      return monthlyRevenue.map((item) => ({
        name: item.month.slice(0, 3),
        earnings: Number(item.totalCommission ?? 0),
      }));
    }

    /**
     * Weekly data is not currently provided by the
     * dashboard API.
     *
     * We therefore return an empty array instead of
     * inventing weekly figures.
     */
    return [];
  }, [monthlyRevenue, period]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row">
        <div>
          <p className="text-sm text-gray-500">Earnings Overview</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            ₦{Number(totalEarnings).toLocaleString()}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>

            <span className="font-semibold text-green-600">Earnings</span>

            <span className="text-sm text-gray-500">total earnings</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex w-fit rounded-xl bg-slate-100 p-1">
          {(["weekly", "monthly", "yearly"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition-all ${
                period === item
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center">
          <div className="text-center">
            <p className="font-medium text-gray-600">
              No earnings data available
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Earnings will appear here once transactions are recorded.
            </p>
          </div>
        </div>
      ) : (
        /* Chart */
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />

                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 13,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 13,
                }}
                tickFormatter={(value) => `₦${Number(value).toLocaleString()}`}
              />

              <Tooltip
                formatter={(value: number) => [
                  `₦${Number(value).toLocaleString()}`,
                  "Earnings",
                ]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#4F46E5"
                strokeWidth={4}
                fill="url(#earningsGradient)"
                activeDot={{
                  r: 7,
                  strokeWidth: 3,
                  stroke: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
