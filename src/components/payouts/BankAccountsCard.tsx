"use client";

import {
  Landmark,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { BankAccount } from "./types";

interface BankAccountsCardProps {
  accounts: BankAccount[];

  onAdd?: () => void;
  onEdit?: (account: BankAccount) => void;
  onDelete?: (account: BankAccount) => void;
}

export default function BankAccountsCard({
  accounts,
  onAdd,
  onEdit,
  onDelete,
}: BankAccountsCardProps) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <div>
          <CardTitle>Bank Accounts</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage where your payouts are sent.
          </p>
        </div>

        <Button onClick={onAdd} className="bg-indigo-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Bank
        </Button>
      </CardHeader>

      <CardContent>
        {accounts.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <Landmark className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No bank account added
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a payout account to withdraw your earnings.
            </p>

            <Button
              className="mt-6"
              onClick={onAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Bank Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-2xl border p-5 transition hover:border-primary/30 hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Landmark className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        {account.bankName}
                      </h4>

                      {account.isDefault && (
                        <Badge
                          variant="secondary"
                          className="gap-1"
                        >
                          <Star className="h-3 w-3 fill-current" />
                          Default
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {account.accountName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      •••• {account.accountNumber.slice(-4)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit?.(account)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete?.(account)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}