"use client";

import {
  CircleDollarSign,
  Landmark,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    icon: CircleDollarSign,
    title: "Earn Revenue",
    description:
      "Revenue from your published assets is added to your available balance after processing.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Landmark,
    title: "Request Withdrawal",
    description:
      "Choose one of your connected bank accounts and enter the amount you want to withdraw.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: CheckCircle2,
    title: "Receive Payment",
    description:
      "Funds are transferred to your bank account, usually within 1–2 business days.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export default function HowPayoutWorks() {
  return (
    <Card className="rounded-3xl border-0 bg-blue-100/70 shadow-sm">
      <CardHeader className="p-6">
        <CardTitle>How Payouts Work</CardTitle>

        <p className="text-sm text-muted-foreground">
          Understand how your earnings become available for withdrawal.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${step.iconBg}`}
              >
                <Icon
                  className={`h-6 w-6 ${step.iconColor}`}
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  {index + 1}. {step.title}
                </h4>

                <p className="mt-1 text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}