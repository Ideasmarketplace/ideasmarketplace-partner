export type PayoutStatus =
  | "Pending"
  | "Paid"
  | "Failed";

export interface Payout {
  id: string;
  reference: string;
  amount: number;
  fee: number;
  netAmount: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  status: PayoutStatus;
  requestedAt: string;
  processedAt?: string;
  notes?: string;
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber?: string;
  swiftCode?: string;
  currency: string;
  isDefault: boolean;
}