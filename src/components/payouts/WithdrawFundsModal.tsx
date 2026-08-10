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

interface WithdrawFundsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface WithdrawFormValues {
  bankId: string;
  amount: number;
}

const initialValues: WithdrawFormValues = {
  bankId: "",
  amount: 0,
};

export default function WithdrawFundsModal({
  open,
  onOpenChange,
}: WithdrawFundsModalProps) {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<WithdrawFormValues>(initialValues);

  const update = (value: Partial<WithdrawFormValues>) => {
    setValues((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const AVAILABLE_BALANCE = 24520;

  const canContinue =
    step === 1
      ? values.bankId !== ""
      : step === 2
        ? values.amount > 0 && values.amount <= AVAILABLE_BALANCE
        : true;

  const canWithdraw =
    values.bankId !== "" &&
    values.amount > 0 &&
    values.amount <= AVAILABLE_BALANCE;

  const handleWithdraw = async () => {
    setLoading(true);

    // await withdraw()

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      setStep(1);
      setValues(initialValues);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>

        <WithdrawStepper currentStep={step} />

        <div className="max-h-[55vh] overflow-y-auto py-8">
          {step === 1 && <BankSelectionStep value={values} onChange={update} />}

          {step === 2 && (
            <WithdrawAmountStep value={values} availableBalance={AVAILABLE_BALANCE} onChange={update} />
          )}

          {step === 3 && <WithdrawReviewStep values={values} />}
        </div>

        <div className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>

          {step < 3 ? (
            <Button
              disabled={!canContinue}
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
