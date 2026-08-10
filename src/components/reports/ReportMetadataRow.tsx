"use client";

interface ReportMetadataRowProps {
  label: string;
  value: React.ReactNode;
}

export default function ReportMetadataRow({
  label,
  value,
}: ReportMetadataRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-none">
      <span className="text-sm font-medium text-gray-500">
        {label}
      </span>

      <div className="text-right font-semibold">
        {value}
      </div>
    </div>
  );
}