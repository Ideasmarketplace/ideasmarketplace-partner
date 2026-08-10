import { Payout } from "./types";

export const payoutMetrics = {
  availableBalance: 24520,
  pendingBalance: 3450,
  totalPaidOut: 182450,
  lastPayout: 8200,
};

export const payoutHistory = [
  { month: "Jan", amount: 12400 },
  { month: "Feb", amount: 15600 },
  { month: "Mar", amount: 14200 },
  { month: "Apr", amount: 19100 },
  { month: "May", amount: 17800 },
  { month: "Jun", amount: 21400 },
  { month: "Jul", amount: 23800 },
];

const generatedPayouts: Payout[] = Array.from(
  { length: 18 },
  (_, index): Payout => ({
    id: `PAY-${String(index + 3).padStart(3, "0")}`,
    reference: `TRX-${Math.floor(
      100000 + Math.random() * 900000,
    )}`,
    amount: 1200 + index * 180,
    fee: 25,
    netAmount: 1200 + index * 180 - 25,
    bankName: "Chase Bank",
    accountName: "John Doe",
    accountNumber: "****2345",
    status:
      index % 3 === 0
        ? "Pending"
        : index % 3 === 1
          ? "Paid"
          : "Failed",
    requestedAt: "Jul 20, 2026",
    processedAt: "Jul 22, 2026",
    notes: "Monthly creator payout",
  }),
);

export const mockPayouts: Payout[] = [
  {
    id: "PAY-001",
    reference: "TRX-583924",
    amount: 5200,
    fee: 35,
    netAmount: 5165,
    bankName: "Bank of America",
    accountName: "John Doe",
    accountNumber: "****5678",
    status: "Paid",
    requestedAt: "Jul 10, 2026",
    processedAt: "Jul 11, 2026",
    notes: "Creator earnings withdrawal",
  },

  {
    id: "PAY-002",
    reference: "TRX-843729",
    amount: 1850,
    fee: 20,
    netAmount: 1830,
    bankName: "Wells Fargo",
    accountName: "John Doe",
    accountNumber: "****9012",
    status: "Pending",
    requestedAt: "Jul 23, 2026",
    notes: "Pending bank settlement",
  },

  ...generatedPayouts,
];