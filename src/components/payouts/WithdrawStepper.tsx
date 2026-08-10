"use client";

const steps = [
  "Bank Account",
  "Amount",
  "Review",
];

interface WithdrawStepperProps {
  currentStep: number;
}

export default function WithdrawStepper({
  currentStep,
}: WithdrawStepperProps) {
  return (
    <div className="flex justify-between py-6">
      {steps.map((step, index) => {
        const active = index + 1 <= currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>

              <span className="mt-2 text-xs">
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-3 h-1 flex-1 rounded ${
                  active
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}