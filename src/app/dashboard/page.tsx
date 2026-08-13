"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import StatCard from "@/components/dashboard/StatCard";
import EarningsChart from "@/components/dashboard/EarningsChart";
import ReferralCard from "@/components/dashboard/ReferralCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityCard from "@/components/dashboard/ActivityCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import CommunityCard from "@/components/dashboard/CommunityCard";
import HeroIllustration from "@/components/HeroIllustration";

import Api from "@/utils/api";
import { useUserStore } from "@/utils/user-store";

/* =========================================================
   Types
========================================================= */

interface DashboardAssetCategory {
  totalAssets?: number;
  publishedAssets?: number;
  draftAssets?: number;
  totalBuyers?: number;
  averagePrice?: number;
}

interface DashboardAssets {
  audio?: DashboardAssetCategory;
  visual?: DashboardAssetCategory;
}

interface DashboardRevenue {
  totalRevenue?: number;
  totalEarnings?: number;
  availableBalance?: number;
  totalWithdrawn?: number;
}

interface DashboardNetwork {
  totalMembers?: number;
  activeMembers?: number;
  totalAssets?: number;
}

interface DashboardPartner {
  _id: string;
  companyName: string;
  referralCode?: string;
}

interface MonthlyRevenue {
  month: string;
  totalCommission: number;
}

interface DashboardData {
  partner: DashboardPartner;
  assets: DashboardAssets;
  revenue: DashboardRevenue;
  network: DashboardNetwork;
  monthlyRevenue: MonthlyRevenue[];
  recentTransactions: unknown[];
  recentMembers: unknown[];
}

/* =========================================================
   Skeleton Components
========================================================= */

function DashboardSkeleton() {
  return (
    <main className="flex-1">
      <div className="space-y-6 animate-pulse">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden rounded-3xl bg-gray-100 px-10 py-10">
          <div className="relative flex flex-col items-center justify-between gap-10 xl:flex-row">
            <div className="w-full max-w-2xl">
              <div className="h-8 w-40 rounded-full bg-gray-200" />

              <div className="mt-5 h-14 w-3/4 rounded-xl bg-gray-200" />

              <div className="mt-5 space-y-3">
                <div className="h-5 w-full rounded bg-gray-200" />
                <div className="h-5 w-5/6 rounded bg-gray-200" />
                <div className="h-5 w-2/3 rounded bg-gray-200" />
              </div>

              <div className="mt-8 flex gap-4">
                <div className="h-12 w-32 rounded-xl bg-gray-200" />
                <div className="h-12 w-36 rounded-xl bg-gray-200" />
              </div>
            </div>

            <div className="h-64 w-64 rounded-3xl bg-gray-200" />
          </div>
        </section>

        {/* Stats Skeleton */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-full">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="mt-3 h-9 w-28 rounded bg-gray-200" />
                </div>

                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />
              </div>

              <div className="mt-6 h-4 w-48 rounded bg-gray-200" />
            </div>
          ))}
        </section>

        {/* Earnings Chart Skeleton */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="mt-6 h-72 w-full rounded-xl bg-gray-100" />
        </section>

        {/* Activity + Referral Skeleton */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 rounded-2xl bg-gray-100 p-6 xl:col-span-7">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-14 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>

          <div className="col-span-12 rounded-2xl bg-gray-100 p-6 md:col-span-6 xl:col-span-5">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="mt-6 h-32 rounded-xl bg-gray-200" />
          </div>
        </section>

        {/* Bottom Skeleton */}
        <section className="grid grid-cols-12 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="col-span-12 rounded-2xl bg-gray-100 p-6 md:col-span-6 xl:col-span-4"
            >
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="mt-6 h-40 rounded-xl bg-gray-200" />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   Dashboard Page
========================================================= */

export default function DashboardPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const token = useUserStore((state) => state.token);

  /* =========================================================
     Fetch Dashboard Overview
  ========================================================= */

  useEffect(() => {
    const fetchDashboardOverview = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await Api.get("partner/dashboard/overview", {});

        console.log("Dashboard overview:", response.data);

        if (response.data?.success) {
          setDashboard(response.data.data as DashboardData);
        } else {
          setError(response.data?.message || "Unable to load dashboard data.");
        }
      } catch (error) {
        console.error("Failed to fetch dashboard overview:", error);

        setError("Unable to load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardOverview();
  }, []);

  /* =========================================================
     GSAP Animation
  ========================================================= */

  useGSAP(
    () => {
      if (loading || !dashboard) return;

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
      )
        .fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.4",
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.2",
        )
        .fromTo(
          paragraphRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .fromTo(
          buttonsRef.current?.children || [],
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.3",
        );
    },
    {
      scope: sectionRef,
      dependencies: [loading, dashboard],
    },
  );

  /* =========================================================
     Loading
  ========================================================= */

  if (loading) {
    return <DashboardSkeleton />;
  }

  /* =========================================================
     Error
  ========================================================= */

  if (!dashboard) {
    return <DashboardSkeleton />;
  }

  /* =========================================================
     Normalize API Data
  ========================================================= */

  const audioAssets = dashboard.assets?.audio?.totalAssets ?? 0;

  const visualAssets = dashboard.assets?.visual?.totalAssets ?? 0;

  const personalAssets = audioAssets + visualAssets;

  const networkMembers = dashboard.network?.totalMembers ?? 0;

  const networkAssets = dashboard.network?.totalAssets ?? 0;

  const totalEarnings = dashboard.revenue?.totalEarnings ?? 0;

  /* =========================================================
     Render
  ========================================================= */

  return (
    <main className="flex-1">
      <div ref={sectionRef} className="space-y-6">
        {/* =====================================================
            Hero Banner
        ===================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-10 xl:flex-row">
            <div className="max-w-2xl">
              <span
                ref={badgeRef}
                className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow"
              >
                Dashboard Overview
              </span>

              <h1
                ref={titleRef}
                className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                Welcome, {dashboard.partner?.companyName || "Partner"}
              </h1>

              <p
                ref={paragraphRef}
                className="mt-5 text-base leading-8 text-slate-600 sm:text-lg"
              >
                Manage your digital assets, community members, reports,
                referrals, and earnings from one beautifully organized
                workspace.
              </p>

              <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
                  View Earnings
                </button>

                <button className="rounded-xl border border-sky-200 bg-white px-6 py-3 font-medium text-sky-700 transition hover:bg-sky-50">
                  Generate Reports
                </button>
              </div>
            </div>

            <HeroIllustration />
          </div>
        </section>

        {/* =====================================================
            Stats
        ===================================================== */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            type="assets"
            data={{
              value: personalAssets,
              changeLabel: "Total digital assets in your personal portfolio.",
            }}
          />

          <StatCard
            type="members"
            data={{
              value: networkMembers,
              changeLabel: "Total members in your partner network.",
            }}
          />

          <StatCard
            type="network"
            data={{
              value: networkAssets,
              changeLabel: "Total digital assets generated by your network.",
            }}
          />

          <StatCard
            type="earnings"
            data={{
              value: totalEarnings,
              changeLabel:
                "Net earnings from your asset sales after commission deductions.",
            }}
          />
        </section>

        {/* =====================================================
            Earnings Chart
        ===================================================== */}

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <EarningsChart
              monthlyRevenue={dashboard.monthlyRevenue}
              totalEarnings={dashboard.revenue?.totalEarnings ?? 0}
            />
          </div>
        </section>

        {/* =====================================================
            Activity + Referrals
        ===================================================== */}

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 xl:col-span-5">
            <ReferralCard
              referralCode={dashboard?.partner?.referralCode}
              totalMembers={dashboard?.network?.totalMembers}
            />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-7">
            <PerformanceCard
              metrics={[
                {
                  label: "Assets Published",
                  value: (
                    (dashboard.assets?.audio?.publishedAssets ?? 0) +
                    (dashboard.assets?.visual?.publishedAssets ?? 0)
                  ).toLocaleString(),
                },
                {
                  label: "Revenue",
                  value: `₦${(
                    dashboard.revenue?.totalRevenue ?? 0
                  ).toLocaleString()}`,
                },
                {
                  label: "Network Members",
                  value: (
                    dashboard.network?.totalMembers ?? 0
                  ).toLocaleString(),
                },
              ]}
            />
          </div>
        </section>

        {/* =====================================================
            Bottom Row
        ===================================================== */}

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7">
            <ActivityCard />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-5">
            <CommunityCard
              totalMembers={dashboard?.network?.totalMembers}
              activeMembers={dashboard?.network?.activeMembers}
            />
          </div>

          {/* <div className="col-span-12 xl:col-span-4">
            <QuickActions />
          </div> */}
        </section>
      </div>
    </main>
  );
}
