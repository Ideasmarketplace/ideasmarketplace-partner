"use client";

import { Settings2, ShieldCheck } from "lucide-react";

interface SettingsHeaderProps {
  updatedAt?: string | Date;
}

export default function SettingsHeader({ updatedAt }: SettingsHeaderProps) {
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Settings2 className="h-8 w-8 text-indigo-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account preferences, security and notification settings.
          </p>

          {formattedDate && (
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated:{" "}
              <span className="font-medium text-foreground">
                {formattedDate}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-start lg:justify-end">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <ShieldCheck className="h-4 w-4" />
          Account Secure
        </div>
      </div>
    </div>
  );
}
