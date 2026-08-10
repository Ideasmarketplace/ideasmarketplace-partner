"use client";

import { useEffect, useState } from "react";
import { Globe2, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralSettingsCardProps {
  settings: any;
  refresh: () => Promise<void>;
}

export default function GeneralSettingsCard({
  settings,
  refresh,
}: GeneralSettingsCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    language: "en",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
  });

  useEffect(() => {
    if (!settings) return;

    setForm({
      language: settings.language ?? "en",
      timezone: settings.timezone ?? "Africa/Lagos",
      dateFormat: settings.dateFormat ?? "DD/MM/YYYY",
    });
  }, [settings]);

  async function handleSubmit() {
    try {
      setLoading(true);

      await Api.put("/partner/settings/general", form);

      await refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Globe2 className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">General Preferences</h2>

            <p className="text-sm text-muted-foreground">
              Configure regional and display preferences.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="grid gap-6 p-6">
        {/* Language */}
        <div className="space-y-2">
          <Label>Language</Label>

          <Select
            value={form.language}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                language: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="en">English</SelectItem>

              <SelectItem value="fr">French</SelectItem>

              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <Label>Timezone</Label>

          <Select
            value={form.timezone}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                timezone: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Africa/Lagos">Africa/Lagos (GMT+1)</SelectItem>

              <SelectItem value="Europe/London">Europe/London</SelectItem>

              <SelectItem value="America/New_York">America/New York</SelectItem>

              <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Format */}
        <div className="space-y-2">
          <Label>Date Format</Label>

          <Select
            value={form.dateFormat}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                dateFormat: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>

              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>

              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
