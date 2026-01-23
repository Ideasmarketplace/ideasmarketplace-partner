"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardToolbar,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  Briefcase,
  Copy,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { useUser } from "@/hooks/use-user";
import Api from "@/utils/api";
import { toast } from "@/hooks/use-toast";


function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return n.toLocaleString();
  return n.toString();
}

export default function StatisticCard2() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("12m");
  const { userData, token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const referralCode = userData?.referralCode;

  // Calculate summary metrics
  useEffect(() => {
    if (!userData?._id) return;
    const fetchPartnerStats = async () => {
      try {
        setIsLoading(true);
        const response = await Api.get(`partner/${userData?._id}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTotalReferrals(response.data.referralsCount);
          setTotalPurchases(response.data.totalPurchases);
          setTotalEarnings(response.data.totalEarnings);
          setUsers(response.data.referrals);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchPartnerStats();
  }, [userData?._id]);

  const cards = [
  {
    icon: ShoppingCart,
    iconColor: "text-blue-600",
    title: "Total Earnings",
    badge: {
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      text: "+3.7%", // optional: compute later
    },
    value: totalEarnings,
    isCurrency: true,
    dateRange: "Total amount made from sales",
  },
  {
    icon: Briefcase,
    iconColor: "text-green-600",
    title: "Active Projects",
    badge: {
      color:
        "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
      icon: TrendingUp,
      iconColor: "text-green-500",
      text: "+12.8%",
    },
    value: 0,
    dateRange: "Total audio projects",
  },
  {
    icon: ShoppingCart,
    iconColor: "text-orange-600",
    title: "Total Purchases",
    badge: {
      color: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
      icon: TrendingUp,
      iconColor: "text-orange-500",
      text: "+3.7%",
    },
    value: totalPurchases,
    dateRange: "Total sales made on all projects",
  },
  {
    icon: Users,
    iconColor: "text-pink-600",
    title: "Referred Users",
    badge: {
      color: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
      icon: TrendingDown,
      iconColor: "text-pink-500",
      text: "-2.1%",
    },
    value: totalReferrals,
    dateRange: "Total users referred",
  },
];


  const cashflowData = [
    { month: "JAN", value: 2100 },
    { month: "FEB", value: 2300 },
    { month: "MAR", value: 1900 },
    { month: "APR", value: 4800 },
    { month: "MAY", value: 5200 },
    { month: "JUN", value: 8900 },
    { month: "JUL", value: 6200 },
    { month: "AUG", value: 7100 },
    { month: "SEP", value: 9400 },
    { month: "OCT", value: 10200 },
    { month: "NOV", value: 11100 },
    { month: "DEC", value: 11800 },
  ];
  // Use custom or Tailwind standard colors: https://tailwindcss.com/docs/colors
  const chartConfig = {
    value: {
      label: "Cashflow",
      color: "bg-violet-500",
    },
  } satisfies ChartConfig;
  // Custom Tooltip
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <>
          <div className="rounded-lg bg-zinc-900 text-white p-3 shadow-lg">
            <div className="text-xs font-medium mb-1">Total:</div>
            <div className="text-sm font-semibold">
              ${payload[0].value.toLocaleString()}
            </div>
          </div>
        </>
      );
    }
    return null;
  };
  // Period configuration
  const PERIODS = {
    "6m": {
      key: "6m",
      label: "6 months",
      dateRange: "Jul 01 - Dec 31, 2026",
    },
    "12m": {
      key: "12m",
      label: "12 months",
      dateRange: "Jan 01 - Dec 31, 2026",
    },
    "2y": {
      key: "2y",
      label: "2 years",
      dateRange: "Jan 01, 2026 - Dec 31, 2026",
    },
  } as const;
  type PeriodKey = keyof typeof PERIODS;

  // Filter data based on selected period
  const getFilteredData = () => {
    switch (selectedPeriod) {
      case "6m":
        return cashflowData.slice(-6);
      case "12m":
        return cashflowData;
      case "2y":
        // Simulate 2 years data by duplicating and modifying the current year
        const previousYear = cashflowData.map((item) => ({
          month: `${item.month} '23`,
          value: Math.round(item.value * 0.85), // 15% lower for previous year
        }));
        const currentYear = cashflowData.map((item) => ({
          month: `${item.month} '24`,
          value: item.value,
        }));
        return [...previousYear, ...currentYear];
      default:
        return cashflowData;
    }
  };
  const filteredData = getFilteredData();
  // Get current period configuration
  const currentPeriod = PERIODS[selectedPeriod];
  // Calculate total and percentage based on filtered data
  const totalCash = filteredData.reduce((sum, item) => sum + item.value, 0);
  const lastValue = filteredData[filteredData.length - 1]?.value || 0;
  const previousValue = filteredData[filteredData.length - 2]?.value || 0;
  const percentageChange =
    previousValue > 0 ? ((lastValue - previousValue) / previousValue) * 100 : 0;

  const copyReferralCode = () => {
    if (!referralCode) {
      toast({ title: "Referral code not available" });
      return;
    }

    navigator.clipboard.writeText(referralCode);
    toast({ title: "Code copied" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="space-y-1 py-20 bg-blue-600 px-5 md:px-16">
        <h1 className="text-3xl md:text-5xl text-white">
          Welcome, <span className="font-bold">{userData?.companyName}</span>
        </h1>
        <p className="text-white text-md tracking-tighter">
          Track your earnings at a glance.
        </p>
      </div>
      <div className="px-5 md:px-16">
        <div className="grow container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 z-10 -mt-10">
            {cards.map((card, i) => (
            <Card key={i}>
                <CardContent className="flex flex-col h-full">
                {/* Title & Badge */}
                <div className="flex items-center justify-between mb-8">
                    <card.icon className={cn("size-6", card.iconColor)} />
                    <Badge
                    className={cn("px-2 py-1 rounded-full", card.badge.color)}
                    >
                    <card.badge.icon
                        className={`w-3 h-3 ${card.badge.iconColor}`}
                    />
                    {card.badge.text}
                    </Badge>
                </div>
                {/* Value & Date Range */}
                <div className="flex-1 flex flex-col justify-between grow">
                    {/* Value */}
                    <div>
                    <div className="text-base font-medium text-muted-foreground mb-1">
                        {card.title}
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-6">
                        {card.value.toLocaleString()}
                    </div>
                    </div>
                    <div className="pt-3 border-t border-muted text-xs text-muted-foreground font-medium">
                    {card.dateRange}
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        <div className="grow container grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20">
            <Card className="w-full">
            <CardHeader className="border-0 min-h-auto pt-6 pb-4">
                <CardTitle className="text-lg font-semibold">Cashflow</CardTitle>
                {/* <CardToolbar>
                <Select
                    value={selectedPeriod}
                    onValueChange={(value) => setSelectedPeriod(value as PeriodKey)}
                >
                    <SelectTrigger>{currentPeriod.label}</SelectTrigger>
                    <SelectContent align="end">
                    {Object.values(PERIODS).map((period) => (
                        <SelectItem key={period.key} value={period.key}>
                        {period.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </CardToolbar> */}
            </CardHeader>
            <CardContent className="px-0">
                {/* Stats Section */}
                <div className="px-5 mb-8">
                <div className="text-xs font-medium text-muted-foreground tracking-wide mb-2">
                    {currentPeriod.dateRange}
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold">
                    ₦0
                    </div>
                    <Badge>
                    <TrendingUp className="size-3" />
                    {Math.abs(percentageChange).toFixed(2)}%
                    </Badge>
                </div>
                </div>
                {/* Chart */}
                <div className="relative">
                <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full ps-1.5 pe-2.5 overflow-visible [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
                >
                    <ComposedChart
                    data={filteredData}
                    margin={{
                        top: 25,
                        right: 25,
                        left: 0,
                        bottom: 25,
                    }}
                    style={{ overflow: "visible" }}
                    >
                    {/* Gradient */}
                    <defs>
                        <linearGradient
                        id="cashflowGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                        >
                        <stop
                            offset="0%"
                            stopColor={chartConfig.value.color}
                            stopOpacity={0.15}
                        />
                        <stop
                            offset="100%"
                            stopColor={chartConfig.value.color}
                            stopOpacity={0}
                        />
                        </linearGradient>
                        <filter
                        id="dotShadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        >
                        <feDropShadow
                            dx="2"
                            dy="2"
                            stdDeviation="3"
                            floodColor="rgba(0,0,0,0.5)"
                        />
                        </filter>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="4 12"
                        stroke="var(--input)"
                        strokeOpacity={1}
                        horizontal={true}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickMargin={12}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `${value / 1000}K`}
                        domain={[0, "dataMax + 1000"]}
                        tickCount={6}
                        tickMargin={12}
                    />
                    <ChartTooltip
                        content={<CustomTooltip />}
                        cursor={{
                        stroke: chartConfig.value.color,
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        }}
                    />
                    {/* Gradient area */}
                    <Area
                        type="linear"
                        dataKey="value"
                        stroke="transparent"
                        fill="url(#cashflowGradient)"
                        strokeWidth={0}
                        dot={false}
                    />
                    {/* Main cashflow line */}
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke={chartConfig.value.color}
                        strokeWidth={3}
                        dot={(props) => {
                        const { cx, cy, payload } = props;
                        if (payload.month === "JUN" || payload.month === "NOV") {
                            return (
                            <circle
                                key={`dot-${cx}-${cy}`}
                                cx={cx}
                                cy={cy}
                                r={6}
                                fill={chartConfig.value.color}
                                stroke="white"
                                strokeWidth={2}
                                filter="url(#dotShadow)"
                            />
                            );
                        }
                        return <g key={`dot-${cx}-${cy}`} />; // Return empty group for other points
                        }}
                        activeDot={{
                        r: 6,
                        fill: chartConfig.value.color,
                        stroke: "white",
                        strokeWidth: 2,
                        filter: "url(#dotShadow)",
                        }}
                    />
                    </ComposedChart>
                </ChartContainer>
                </div>
            </CardContent>
            </Card>
            <Card className="w-full max-w-xl rounded-2xl shadow-xl border-0 bg-zinc-900  text-white">
            <CardHeader className="border-0 flex flex-col items-start pt-6">
                <CardTitle className="text-lg font-semibold text-white">
                Refer People
                </CardTitle>
                <CardDescription className="text-zinc-400">Share your code with your community and start earning</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-b border-zinc-700 mb-10 mt-5" />
                <div className="flex items-end gap-2 mb-5">
                <span className="text-2xl md:text-5xl font-bold tracking-tight text-center text-white">Earn 5% commissions on every
                purchase they make.</span>
                </div>
                <div className="border-b border-zinc-700 mb-6 mt-20" />
                {/* Segmented Progress Bar */}
                <div className="flex flex-col w-full mb-3">
                <div className="flex items-center justify-between bg-yellow-400 px-4 py-3 rounded-md">
                    <code className="text-lg font-mono font-semibold">
                    {referralCode}
                    </code>
                    <Button size="sm" className="bg-white text-black hover:bg-yellow-800 hover:text-white" onClick={copyReferralCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                    </Button>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
