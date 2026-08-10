"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import BankAccountForm from "./BankAccountForm";
import { BankAccount } from "./types";

interface BankAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  account?: BankAccount | null;

  onSave?: (account: BankAccount) => void;
}

export default function BankAccountModal({
  open,
  onOpenChange,
  account,
  onSave,
}: BankAccountModalProps) {
  const [values, setValues] = useState<BankAccount>(
    account ?? {
      id: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      routingNumber: "",
      swiftCode: "",
      currency: "USD",
      isDefault: false,
    }
  );

  const handleSave = () => {
    onSave?.(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {account ? "Edit Bank Account" : "Add Bank Account"}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto py-6">
          <BankAccountForm
            value={values}
            onChange={setValues}
          />
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            {account ? "Save Changes" : "Add Account"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}