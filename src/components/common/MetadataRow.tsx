"use client";

import { ReactNode } from "react";

interface MetadataRowProps {
  label: string;
  value: ReactNode;
}

export default function MetadataRow({ label, value }: MetadataRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-gray-100 py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>

      <div className="text-right font-medium">{value}</div>
    </div>
  );
}
