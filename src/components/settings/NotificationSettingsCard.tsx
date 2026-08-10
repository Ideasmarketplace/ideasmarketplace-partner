"use client";

import { useEffect, useState } from "react";
import { Bell, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsCardProps {
  settings: any;
  refresh: () => Promise<void>;
}

export default function NotificationSettingsCard({
  settings,
  refresh,
}: NotificationSettingsCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    emailNotifications: true,
    referralNotifications: true,
    revenueNotifications: true,
    payoutNotifications: true,
    marketingEmails: false,
    monthlyReports: true,
  });

  useEffect(() => {
    if (!settings) return;

    setForm({
      emailNotifications:
        settings.emailNotifications ?? true,
      referralNotifications:
        settings.referralNotifications ?? true,
      revenueNotifications:
        settings.revenueNotifications ?? true,
      payoutNotifications:
        settings.payoutNotifications ?? true,
      marketingEmails:
        settings.marketingEmails ?? false,
      monthlyReports:
        settings.monthlyReports ?? true,
    });
  }, [settings]);

  async function handleSubmit() {
    try {
      setLoading(true);

      await Api.put(
        "/partner/settings/notifications",
        form
      );

      await refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function update(
    key: keyof typeof form,
    value: boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const items = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important account updates by email.",
    },
    {
      key: "referralNotifications",
      title: "Referral Notifications",
      description:
        "Notify me whenever a new member joins using my referral code.",
    },
    {
      key: "revenueNotifications",
      title: "Revenue Notifications",
      description:
        "Receive alerts whenever you earn commission.",
    },
    {
      key: "payoutNotifications",
      title: "Payout Notifications",
      description:
        "Receive updates when withdrawals are processed.",
    },
    {
      key: "monthlyReports",
      title: "Monthly Reports",
      description:
        "Receive monthly revenue and performance reports.",
    },
    {
      key: "marketingEmails",
      title: "Marketing Emails",
      description:
        "Receive newsletters, product updates and promotional content.",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Bell className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Notification Preferences
            </h2>

            <p className="text-sm text-muted-foreground">
              Choose which notifications you would like to receive.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-6 p-6"
          >
            <div className="flex-1">
              <Label className="text-base font-medium">
                {item.title}
              </Label>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>

            <Switch
              checked={form[item.key]}
              onCheckedChange={(value) =>
                update(item.key, value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}