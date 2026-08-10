"use client";

import { DollarSign } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { WithdrawFormValues } from "./WithdrawFundsModal";

interface WithdrawAmountStepProps {
  value: WithdrawFormValues;
  onChange: (
    value: Partial<WithdrawFormValues>
  ) => void;
  availableBalance: number;
}

const PROCESSING_FEE = 25;

export default function WithdrawAmountStep({
  value,
  onChange,
  availableBalance
}: WithdrawAmountStepProps) {
  const netAmount = Math.max(
    value.amount - PROCESSING_FEE,
    0
  );

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-emerald-50 p-6">
        <p className="text-sm text-emerald-700">
          Available Balance
        </p>

        <h2 className="mt-2 text-3xl font-bold text-emerald-700">
          ${availableBalance.toLocaleString()}
        </h2>
      </div>

      <div className="space-y-2">
        <Label>Withdrawal Amount</Label>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="number"
            min={0}
            max={availableBalance}
            className="pl-10"
            placeholder="Enter amount"
            value={value.amount || ""}
            onChange={(e) =>
              onChange({
                amount: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/40 p-5 space-y-4">
        <div className="flex justify-between">
          <span>Processing Fee</span>

          <span>${PROCESSING_FEE}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>You will receive</span>

          <span>${netAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}