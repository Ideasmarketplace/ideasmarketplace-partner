"use client";

import { BadgeCheck, Building2 } from "lucide-react";

interface ProfileHeaderProps {
  companyName?: string;
  representativeName?: string;
  status?: string;
}

export default function ProfileHeader({
  companyName,
  representativeName,
  status,
}: ProfileHeaderProps) {
  const approved = status === "approved";

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Building2 className="h-8 w-8 text-indigo-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your organisation's public information and account details.
          </p>

          {(companyName || representativeName) && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {companyName && (
                <span className="text-sm font-semibold text-gray-900">
                  {companyName}
                </span>
              )}

              {representativeName && (
                <>
                  <span className="hidden text-gray-300 sm:inline">•</span>

                  <span className="text-sm text-gray-500">
                    {representativeName}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-start lg:justify-end">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            approved
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <BadgeCheck className="h-4 w-4" />

          {approved ? "Approved Partner" : "Pending Approval"}
        </div>
      </div>
    </div>
  );
}
