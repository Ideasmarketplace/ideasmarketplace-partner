"use client";

import { Label } from "@/components/ui/label";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { WithdrawFormValues } from "./WithdrawFundsModal";

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

interface Props {
  value: WithdrawFormValues;
  onChange: (
    value: Partial<WithdrawFormValues>
  ) => void;
}

export default function BankSelectionStep({
  value,
  onChange,
}: Props) {
  return (
    <RadioGroup
      value={value.bankId}
      onValueChange={(bankId) =>
        onChange({ bankId })
      }
      className="space-y-4"
    >
      {banks.map((bank) => (
        <Label
          key={bank.id}
          className="flex cursor-pointer items-center justify-between rounded-xl border p-5"
        >
          <div>
            <p className="font-semibold">
              {bank.bank}
            </p>

            <p className="text-sm text-muted-foreground">
              {bank.account}
            </p>
          </div>

          <RadioGroupItem
            value={bank.id}
            id={bank.id}
          />
        </Label>
      ))}
    </RadioGroup>
  );
}