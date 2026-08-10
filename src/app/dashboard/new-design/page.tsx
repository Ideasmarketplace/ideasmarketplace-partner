// app/dashboard/page.tsx

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/Header";

import StatCard from "@/components/dashboard/StatCard";
import EarningsChart from "@/components/dashboard/EarningsChart";
import ReferralCard from "@/components/dashboard/ReferralCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityCard from "@/components/dashboard/ActivityCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import CommunityCard from "@/components/dashboard/CommunityCard";
import AIAssistant from "@/components/dashboard/AIAssistant";
import BottomBanner from "@/components/dashboard/BottomBanner";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">
          <Header />

          <div className="space-y-6 p-6">
            {/* Welcome */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome back, Glory!
              </h1>

              <p className="mt-2 text-gray-500">
                Track your assets, referrals, earnings and community
                performance—all in one place.
              </p>
            </div>

            {/* Stats */}
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard type="assets" />
              <StatCard type="members" />
              <StatCard type="network" />
              <StatCard type="earnings" />
              {/* <StatCard type="sales" /> */}
            </section>

            {/* Main Row */}
            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-12 xl:col-span-12">
                <EarningsChart />
              </div>

            </section>

            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-12 xl:col-span-7">
                <ActivityCard />
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-5">
                <ReferralCard />
              </div>
            </section>

            {/* Bottom Row */}
            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <PerformanceCard />
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <CommunityCard />
              </div>

              <div className="col-span-12 xl:col-span-4">
                <QuickActions />
              </div>

              {/* <div className="col-span-12 xl:col-span-4">
                <AIAssistant />
              </div> */}
            </section>

            {/* Footer Banner */}
            <BottomBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
