"use client";

import { useEffect, useState } from "react";

import Api from "@/utils/api";

import {
  SettingsHeader,
  GeneralSettingsCard,
  NotificationSettingsCard,
  SecuritySettingsCard,
} from "@/components/settings";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/user-store";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [userData, router]);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const { data } = await Api.get("/partner/settings");

      setSettings(data.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="space-y-6">
        <SettingsHeader />

        <div className="grid gap-6 xl:grid-cols-2">
          <GeneralSettingsCard settings={settings} refresh={loadSettings} />

          <NotificationSettingsCard
            settings={settings}
            refresh={loadSettings}
          />
        </div>

        <SecuritySettingsCard settings={settings} refresh={loadSettings} />
      </main>
    </div>
  );
}
