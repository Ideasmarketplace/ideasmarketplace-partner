"use client";

import MetadataRow from "@/components/common/MetadataRow";

import { Revenue } from "./types";

interface RevenueMetadataProps {
  revenue: Revenue;
}

export default function RevenueMetadata({
  revenue,
}: RevenueMetadataProps) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold">
        Transaction Details
      </h3>

      <MetadataRow
        label="Customer"
        value={revenue.customer}
      />

      <MetadataRow
        label="Revenue Source"
        value={revenue.source}
      />

      <MetadataRow
        label="Payment Method"
        value={revenue.paymentMethod}
      />

      <MetadataRow
        label="Reference"
        value={revenue.reference}
      />

      <MetadataRow
        label="Transaction Date"
        value={revenue.transactionDate}
      />

      <MetadataRow
        label="Status"
        value={revenue.status}
      />

      <MetadataRow
        label="Created"
        value={revenue.createdAt}
      />

      <MetadataRow
        label="Updated"
        value={revenue.updatedAt}
      />

      <MetadataRow
        label="Notes"
        value={revenue.notes}
      />
    </div>
  );
}