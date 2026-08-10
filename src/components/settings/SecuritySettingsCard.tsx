"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Smartphone,
  Monitor,
  Bell,
  CheckCircle2,
  Save,
} from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SecuritySettingsCardProps {
  settings: any;
  refresh: () => Promise<void>;
}

export default function SecuritySettingsCard({
  settings,
  refresh,
}: SecuritySettingsCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
  });

  useEffect(() => {
    if (!settings) return;

    setForm({
      twoFactorEnabled:
        settings.twoFactorEnabled ?? false,
      loginAlerts:
        settings.loginAlerts ?? true,
    });
  }, [settings]);

  function update(
    key: keyof typeof form,
    value: boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await Api.put(
        "/partner/settings/security",
        form
      );

      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Security
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage the security of your partner account.
            </p>
          </div>
        </div>

        <Button
          disabled={loading}
          onClick={handleSubmit}
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="divide-y">

        {/* Two Factor */}
        <div className="flex items-center justify-between p-6">
          <div className="flex gap-4">
            <Smartphone className="mt-1 h-5 w-5 text-indigo-600" />

            <div>
              <Label className="text-base font-medium">
                Two-Factor Authentication
              </Label>

              <p className="mt-1 text-sm text-muted-foreground">
                Add an extra layer of protection using an authenticator app.
              </p>
            </div>
          </div>

          <Switch
            checked={form.twoFactorEnabled}
            onCheckedChange={(value) =>
              update(
                "twoFactorEnabled",
                value
              )
            }
          />
        </div>

        {/* Login Alerts */}
        <div className="flex items-center justify-between p-6">
          <div className="flex gap-4">
            <Bell className="mt-1 h-5 w-5 text-indigo-600" />

            <div>
              <Label className="text-base font-medium">
                Login Alerts
              </Label>

              <p className="mt-1 text-sm text-muted-foreground">
                Receive an email whenever a new device signs into your account.
              </p>
            </div>
          </div>

          <Switch
            checked={form.loginAlerts}
            onCheckedChange={(value) =>
              update(
                "loginAlerts",
                value
              )
            }
          />
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-4 p-6">
          <Monitor className="h-5 w-5 text-indigo-600" />

          <div>
            <p className="font-medium">
              Last Login
            </p>

            <p className="text-sm text-muted-foreground">
              {settings?.lastLogin
                ? new Date(
                    settings.lastLogin
                  ).toLocaleString()
                : "Unavailable"}
            </p>
          </div>
        </div>

        {/* Password */}
        <div className="flex items-center gap-4 p-6">
          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <div>
            <p className="font-medium">
              Last Password Change
            </p>

            <p className="text-sm text-muted-foreground">
              {settings?.passwordChangedAt
                ? new Date(
                    settings.passwordChangedAt
                  ).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}