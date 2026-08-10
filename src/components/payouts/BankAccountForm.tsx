"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BankAccount } from "./types";

interface Props {
  value: BankAccount;

  onChange: (value: BankAccount) => void;
}

const banks = [
  "Bank of America",
  "Chase",
  "Wells Fargo",
  "Citibank",
];

export default function BankAccountForm({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Account Holder</Label>

        <Input
          value={value.accountName}
          onChange={(e) =>
            onChange({
              ...value,
              accountName: e.target.value,
            })
          }
        />
      </div>

      <div>
        <Label>Bank</Label>

        <Select
          value={value.bankName}
          onValueChange={(bankName) =>
            onChange({
              ...value,
              bankName,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bank" />
          </SelectTrigger>

          <SelectContent>
            {banks.map((bank) => (
              <SelectItem
                key={bank}
                value={bank}
              >
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Account Number</Label>

        <Input
          value={value.accountNumber}
          onChange={(e) =>
            onChange({
              ...value,
              accountNumber: e.target.value,
            })
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Routing Number</Label>

          <Input
            value={value.routingNumber}
            onChange={(e) =>
              onChange({
                ...value,
                routingNumber: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Label>SWIFT Code</Label>

          <Input
            value={value.swiftCode}
            onChange={(e) =>
              onChange({
                ...value,
                swiftCode: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <Label>Currency</Label>

        <Select
          value={value.currency}
          onValueChange={(currency) =>
            onChange({
              ...value,
              currency,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="USD">
              USD
            </SelectItem>

            <SelectItem value="EUR">
              EUR
            </SelectItem>

            <SelectItem value="GBP">
              GBP
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 rounded-xl border p-4">
        <Checkbox
          checked={value.isDefault}
          onCheckedChange={(checked) =>
            onChange({
              ...value,
              isDefault: !!checked,
            })
          }
        />

        <Label>Set as default payout account</Label>
      </div>
    </div>
  );
}