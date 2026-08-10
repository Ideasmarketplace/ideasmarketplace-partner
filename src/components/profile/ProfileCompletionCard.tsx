"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProfileCompletionCardProps {
  completion?: {
    percentage: number;
    completedFields: number;
    totalFields: number;
    missingFields?: string[];
  };
}

export default function ProfileCompletionCard({
  completion,
}: ProfileCompletionCardProps) {
  const percentage = completion?.percentage ?? 0;
  const completedFields = completion?.completedFields ?? 0;
  const totalFields = completion?.totalFields ?? 0;
  const missingFields = completion?.missingFields ?? [];

  const complete = percentage >= 100;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Completion
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Complete your profile to improve credibility and unlock future
            platform features.
          </p>
        </div>

        {complete ? (
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        ) : (
          <AlertCircle className="h-8 w-8 text-amber-500" />
        )}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-4xl font-bold text-gray-900">
            {percentage}%
          </span>

          <span className="text-sm text-gray-500">
            {completedFields} / {totalFields} completed
          </span>
        </div>

        <Progress value={percentage} className="h-3" />
      </div>

      {!complete && missingFields.length > 0 && (
        <div className="mt-6 rounded-xl bg-amber-50 p-4">
          <h4 className="mb-3 text-sm font-semibold text-amber-800">
            Remaining fields
          </h4>

          <ul className="space-y-2">
            {missingFields.map((field) => (
              <li
                key={field}
                className="flex items-center gap-2 text-sm text-amber-700"
              >
                <AlertCircle className="h-4 w-4" />
                {field}
              </li>
            ))}
          </ul>
        </div>
      )}

      {complete && (
        <div className="mt-6 rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">
              Your profile is fully completed.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
