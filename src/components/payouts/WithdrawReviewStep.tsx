"use client";

import MetadataRow from "@/components/common/MetadataRow";

import { WithdrawFormValues } from "./WithdrawFundsModal";

interface WithdrawReviewStepProps {
  values: WithdrawFormValues;
}

const banks = [
  {
    id: "1",
    bank: "Bank of America",
    account: "****5678",
  },
  {
    id: "2",
    bank: "Chase Bank",
    account: "****2345",
  },
];

const PROCESSING_FEE = 25;

export default function WithdrawReviewStep({
  values,
}: WithdrawReviewStepProps) {
  const bank = banks.find(
    (b) => b.id === values.bankId
  );

  return (
    <div className="rounded-2xl border bg-white">
      <MetadataRow
        label="Bank"
        value={bank?.bank ?? "-"}
      />

      <MetadataRow
        label="Account"
        value={bank?.account ?? "-"}
      />

      <MetadataRow
        label="Withdrawal Amount"
        value={`$${values.amount.toLocaleString()}`}
      />

      <MetadataRow
        label="Processing Fee"
        value={`$${PROCESSING_FEE}`}
      />

      <MetadataRow
        label="Net Amount"
        value={`$${(
          values.amount - PROCESSING_FEE
        ).toLocaleString()}`}
      />

      <MetadataRow
        label="Estimated Arrival"
        value="1–2 Business Days"
      />
    </div>
  );
}