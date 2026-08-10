import { BankAccount } from "./types";

export const mockBankAccounts: BankAccount[] = [
  {
    id: "BANK-001",
    bankName: "Zenith Bank",
    accountName: "John Doe",
    accountNumber: "1234567890",
    routingNumber: "021000322",
    swiftCode: "BOFAUS3N",
    currency: "USD",
    isDefault: true,
  },
  {
    id: "BANK-002",
    bankName: "Guaranty Trust Bank",
    accountName: "John Doe",
    accountNumber: "9876543210",
    routingNumber: "021000021",
    swiftCode: "CHASUS33",
    currency: "USD",
    isDefault: false,
  },
  {
    id: "BANK-003",
    bankName: "Wema Bank",
    accountName: "John Doe",
    accountNumber: "4567891230",
    routingNumber: "121000248",
    swiftCode: "WFBIUS6S",
    currency: "USD",
    isDefault: false,
  },
];