"use client";

import {
  DollarSign,
  Wallet,
  Clock3,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface RevenueMetrics {
  totalRevenue?: number;
  monthlyRevenue?: number;
  pendingRevenue?: number;
  pendingTransactions?: number;
  averageRevenue?: number;
}

interface RevenueMetricCardsProps {
  data: RevenueMetrics | null;
  loading?: boolean;
}

interface RevenueCard {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: typeof DollarSign;
  color: string;
}

function formatCurrency(value?: number) {
  return `₦${(value ?? 0).toLocaleString()}`;
}

function MetricSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-2xl bg-gray-200" />

        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>

      <div className="mt-8">
        <div className="h-4 w-28 rounded bg-gray-200" />

        <div className="mt-3 h-9 w-36 rounded bg-gray-200" />

        <div className="mt-3 h-4 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function RevenueMetricCards({
  data,
  loading = false,
}: RevenueMetricCardsProps) {
  if (loading) {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </section>
    );
  }

  const cards: RevenueCard[] = [
    {
      title: "Total Revenue",
      value: formatCurrency(data?.totalRevenue),
      change: "+0%",
      description: "Lifetime revenue",
      icon: DollarSign,
      color: "bg-emerald-100 text-emerald-600",
    },

    {
      title: "This Month",
      value: formatCurrency(data?.monthlyRevenue),
      change: "+0%",
      description: "Compared to last month",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
    },

    {
      title: "Pending Revenue",
      value: formatCurrency(data?.pendingRevenue),
      change: "+0%",
      description: `${data?.pendingTransactions ?? 0} transactions`,
      icon: Clock3,
      color: "bg-amber-100 text-amber-600",
    },

    {
      title: "Average Monthly",
      value: formatCurrency(data?.averageRevenue),
      change: "+0%",
      description: "Last 12 months",
      icon: Wallet,
      color: "bg-sky-100 text-sky-600",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}

            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                <ArrowUpRight className="h-3.5 w-3.5" />

                {card.change}
              </div>
            </div>

            {/* Body */}

            <div className="mt-8">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {card.value}
              </h3>

              <p className="mt-2 text-sm text-gray-500">{card.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
