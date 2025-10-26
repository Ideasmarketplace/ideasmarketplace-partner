"use client";

import { useEffect, useState } from "react";
import { ChartLine, Users, DollarSign, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { MetricCard } from "@/components/MetricCard";
import Header from "@/components/Header";
import { ReferralTable, ReferralUser } from "@/components/ReferralTable";
import { AnalyticsChart } from "@/components/AnalyticsCharts";
import Api from "@/utils/api";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockChartData = [
  {
    name: "Jan",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
  {
    name: "Feb",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
  {
    name: "Mar",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
  {
    name: "Apr",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
  {
    name: "May",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
  {
    name: "Jun",
    referrals: 0,
    purchases: 0,
    earnings: 0,
  },
];

const mockReferralUsers: ReferralUser[] = [];

const mockEarningsData = [
  { name: "Idea Sales", value: 0, color: "#635BFF" },
  { name: "Premium Referrals", value: 0, color: "#3ECF8E" },
  { name: "Bonuses", value: 0, color: "#F6BD16" },
];

export default function Analytics() {
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

  const copyReferralCode = () => {
    if (!referralCode) {
      toast({ title: "Referral code not available" });
      return;
    }

    navigator.clipboard.writeText(referralCode);
    toast({ title: "Code copied" });
  };

  return (
    <div className="min-h-screen px-5 md:px-16 lg:px-28 bg-background">
      <Header />
      <div className="container py-10 space-y-10">
        {/* Welcome Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            Welcome, {userData?.companyName}
          </h1>
          <p className="text-muted-foreground text-sm">
            Track your referral performance and earnings at a glance.
          </p>
        </div>

        {/* Referral Code Section */}
        <Card className="bg-muted/50 border-dashed border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-muted px-4 py-3 rounded-md">
              <code className="text-lg font-mono font-semibold">
                {referralCode}
              </code>
              <Button variant="outline" size="sm" onClick={copyReferralCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this code with your community. Earn commissions on every
              purchase they make.
            </p>
          </CardContent>
        </Card>

        {/* Metric Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <MetricCard
            title="Total Referrals"
            value={totalReferrals}
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, positive: true }}
          />
          <MetricCard
            title="Total Purchases"
            value={totalPurchases}
            icon={<ChartLine className="h-4 w-4" />}
            trend={{ value: 8, positive: true }}
          />
          <MetricCard
            title="Total Earnings"
            value={`₦${totalEarnings.toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 14, positive: true }}
          />
        </div>

        {/* Performance Overview */}
        {/* <div className="space-y-8">
          <h2 className="text-xl font-semibold">Performance Overview</h2>
          <AnalyticsChart
            title="Monthly Performance"
            data={mockChartData}
            dataKeys={[
              { key: "referrals", name: "Referrals", color: "#635BFF" },
              { key: "purchases", name: "Purchases", color: "#3ECF8E" },
              { key: "earnings", name: "Earnings ($)", color: "#EB4785" },
            ]}
          />
        </div> */}

        {/* Full Referral List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Referred Users</h2>
          <ReferralTable users={users} />
        </div>
      </div>
    </div>
  );
}
