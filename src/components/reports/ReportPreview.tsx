"use client";

import Image from "next/image";

import {
  Eye,
  Download,
  CalendarDays,
} from "lucide-react";

import ReportStatusBadge from "./ReportStatusBadge";
import { Report } from "./types";

interface ReportPreviewProps {
  report: Report;
}

export default function ReportPreview({
  report,
}: ReportPreviewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={report.thumbnail}
          alt={report.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {report.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {report.description}
            </p>
          </div>

          <ReportStatusBadge status={report.status} />
        </div>

        <div className="grid grid-cols-3 gap-6 border-t pt-5">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-indigo-600" />

            <div>
              <p className="text-xs text-gray-500">
                Views
              </p>

              <p className="font-semibold">
                {report.views.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Download className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-xs text-gray-500">
                Downloads
              </p>

              <p className="font-semibold">
                {report.downloads.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-orange-600" />

            <div>
              <p className="text-xs text-gray-500">
                Updated
              </p>

              <p className="font-semibold">
                {report.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}