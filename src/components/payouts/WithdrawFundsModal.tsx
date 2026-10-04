"use client";

import { useEffect, useState } from "react";

import Api from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import WithdrawStepper from "./WithdrawStepper";
import WithdrawAmountStep from "./WithdrawAmountStep";

// bankId is gone: the destination is the account saved on the partner's
// profile and the server reads it from there. The client never sends bank
// details with a withdrawal.
export interface WithdrawFormValues {
  amount: number;
}

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface WithdrawFundsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: WithdrawFormValues) => Promise<void>;
  onAddBankDetails?: () => void; // e.g. () => router.push(<your profile route>)
  availableBalance?: number;
}

const initialValues: WithdrawFormValues = { amount: 0 };
const maskAccount = (n: string) => `••••${n.slice(-4)}`;

export default function WithdrawFundsModal({
  open,
  onOpenChange,
  onSubmit,
  onAddBankDetails,
  availableBalance = 0,
}: WithdrawFundsModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<WithdrawFormValues>(initialValues);
  const [bank, setBank] = useState<BankDetails | null>(null);
  const [bankLoading, setBankLoading] = useState(false);

  // Fetched fresh each time the modal opens, so edits made in the profile
  // are always reflected.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const loadBank = async () => {
      try {
        setBankLoading(true);
        const res = await Api.get("partner/profile/bank-details");
        if (!cancelled) setBank(res.data?.data ?? null);
      } catch {
        if (!cancelled) setBank(null);
      } finally {
        if (!cancelled) setBankLoading(false);
      }
    };

    loadBank();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const bankReady =
    bank && bank.bankName && bank.accountName && bank.accountNumber
      ? bank
      : null;

  const update = (value: Partial<WithdrawFormValues>) =>
    setValues((prev) => ({ ...prev, ...value }));

  const amountValid = values.amount > 0 && values.amount <= availableBalance;
  const canContinue =
    step === 1 ? Boolean(bankReady) : step === 2 ? amountValid : true;
  const canWithdraw = Boolean(bankReady) && amountValid;

  const reset = () => {
    setStep(1);
    setValues(initialValues);
  };

  const handleWithdraw = async () => {
    if (!canWithdraw) return;
    setLoading(true);

    try {
      await onSubmit?.(values);
      toast({ title: "Withdrawal request submitted" });
      onOpenChange(false);
      reset();
    } catch (error: any) {
      // Previously this only logged to the console, so a failed request
      // showed the user nothing at all.
      toast({
        title: "Withdrawal failed",
        description: error?.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !loading) reset();
    onOpenChange(next);
  };

  const goToBankDetails = () => {
    onOpenChange(false);
    onAddBankDetails?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>

        <WithdrawStepper currentStep={step} />

        <div className="max-h-[55vh] overflow-y-auto py-8">
          {step === 1 &&
            (bankLoading ? (
              <Skeleton className="h-24 w-full rounded-xl" />
            ) : bankReady ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your withdrawal will be sent to this account:
                </p>
                <div className="rounded-xl border p-4">
                  <p className="font-semibold">{bankReady.accountName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {maskAccount(bankReady.accountNumber)} ·{" "}
                    {bankReady.bankName}
                  </p>
                </div>
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={goToBankDetails}
                >
                  Edit bank details
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Add your bank details to your profile before requesting a
                  withdrawal.
                </p>
                <Button onClick={goToBankDetails}>Add bank details</Button>
              </div>
            ))}

          {step === 2 && (
            <WithdrawAmountStep
              value={values}
              availableBalance={availableBalance}
              onChange={update}
            />
          )}

          {step === 3 && bankReady && (
            <div className="space-y-3 text-sm">
              <ReviewRow
                label="Amount"
                value={`₦${values.amount.toLocaleString()}`}
              />
              <ReviewRow label="Account name" value={bankReady.accountName} />
              <ReviewRow
                label="Account"
                value={`${maskAccount(bankReady.accountNumber)} · ${bankReady.bankName}`}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            disabled={step === 1 || loading}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>

          {step < 3 ? (
            <Button
              disabled={!canContinue || loading}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={handleWithdraw} disabled={!canWithdraw || loading}>
              {loading ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
