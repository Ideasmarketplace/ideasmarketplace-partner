"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import WithdrawStepper from "./WithdrawStepper";
import BankSelectionStep from "./BankSelectionStep";
import WithdrawAmountStep from "./WithdrawAmountStep";
import WithdrawReviewStep from "./WithdrawReviewStep";

export interface WithdrawFormValues {
  bankId: string;
  amount: number;
}

interface WithdrawFundsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: WithdrawFormValues) => Promise<void>;
  availableBalance?: number;
}

const initialValues: WithdrawFormValues = {
  bankId: "",
  amount: 0,
};

export default function WithdrawFundsModal({
  open,
  onOpenChange,
  onSubmit,
  availableBalance = 0,
}: WithdrawFundsModalProps) {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [values, setValues] =
    useState<WithdrawFormValues>(initialValues);

  const update = (value: Partial<WithdrawFormValues>) => {
    setValues((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const canContinue =
    step === 1
      ? values.bankId !== ""
      : step === 2
        ? values.amount > 0 &&
          values.amount <= availableBalance
        : true;

  const canWithdraw =
    values.bankId !== "" &&
    values.amount > 0 &&
    values.amount <= availableBalance;

  const handleWithdraw = async () => {
    if (!canWithdraw) return;

    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(values);
      }

      onOpenChange(false);
      setStep(1);
      setValues(initialValues);
    } catch (error) {
      console.error("Withdrawal failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !loading) {
      setStep(1);
      setValues(initialValues);
    }

    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>

        <WithdrawStepper currentStep={step} />

        <div className="max-h-[55vh] overflow-y-auto py-8">
          {step === 1 && (
            <BankSelectionStep
              value={values}
              onChange={update}
            />
          )}

          {step === 2 && (
            <WithdrawAmountStep
              value={values}
              availableBalance={availableBalance}
              onChange={update}
            />
          )}

          {step === 3 && (
            <WithdrawReviewStep values={values} />
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
            <Button
              onClick={handleWithdraw}
              disabled={!canWithdraw || loading}
            >
              {loading
                ? "Processing..."
                : "Confirm Withdrawal"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
