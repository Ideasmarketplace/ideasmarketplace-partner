"use client";

import MetadataRow from "@/components/common/MetadataRow";
import StatusBadge from "@/components/table/StatusBadge";
import { Payout } from "./types";

interface PayoutMetadataProps {
  payout: Payout;
}

export default function PayoutMetadata({
  payout,
}: PayoutMetadataProps) {
  return (
    <div className="rounded-2xl border bg-white">
      <MetadataRow
        label="Reference"
        value={payout.reference}
      />

      <MetadataRow
        label="Bank"
        value={payout.bankName}
      />

      <MetadataRow
        label="Account Name"
        value={payout.accountName}
      />

      <MetadataRow
        label="Account Number"
        value={payout.accountNumber}
      />

      <MetadataRow
        label="Requested"
        value={payout.requestedAt}
      />

      <MetadataRow
        label="Processed"
        value={payout.processedAt ?? "-"}
      />

      <MetadataRow
        label="Status"
        value={<StatusBadge status={payout.status} />}
      />

      <MetadataRow
        label="Notes"
        value={payout.notes ?? "-"}
      />
    </div>
  );
}