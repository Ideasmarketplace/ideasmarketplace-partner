"use client";

import { Database } from "lucide-react";

interface TableEmptyProps {
  title?: string;
  description?: string;
}

export default function TableEmpty({
  title = "No records found",
  description = "There is currently no data to display.",
}: TableEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Database className="h-8 w-8 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
    </div>
  );
}
