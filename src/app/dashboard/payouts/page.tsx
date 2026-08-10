"use client";

import { useState } from "react";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import {
  mockBankAccounts,
  Payout,
  BankAccount,
  PayoutMetricCards,
  PayoutHistoryChart,
  PayoutTable,
  PayoutPreviewDrawer,
  WithdrawFundsModal,
  HowPayoutWorks,
  BankAccountsCard,
  BankAccountModal,
} from "@/components/payouts";

export default function PayoutsPage() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [deletePayoutOpen, setDeletePayoutOpen] = useState(false);
  const [deleteBankOpen, setDeleteBankOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            {/* Header */}
            <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold">Payouts</h1>

                <p className="mt-2 text-muted-foreground">
                  Withdraw your earnings and manage your payout accounts.
                </p>
              </div>
            </section>

            {/* Metric Cards */}
            <PayoutMetricCards onWithdraw={() => setWithdrawOpen(true)} />

            {/* Table */}
            <PayoutTable
              onView={(payout) => {
                setSelectedPayout(payout);
                setDrawerOpen(true);
              }}
              onDelete={(payout) => {
                setSelectedPayout(payout);
                setDeletePayoutOpen(true);
              }}
            />

            {/* Information */}
            <section className="grid gap-6 xl:grid-cols-2">
              <HowPayoutWorks />

              <BankAccountsCard
                accounts={mockBankAccounts}
                onAdd={() => {
                  setSelectedBank(null);
                  setBankModalOpen(true);
                }}
                onEdit={(bank) => {
                  setSelectedBank(bank);
                  setBankModalOpen(true);
                }}
                onDelete={(bank) => {
                  setSelectedBank(bank);
                  setDeleteBankOpen(true);
                }}
              />
            </section>

            {/* Chart */}
            {/* <PayoutHistoryChart /> */}

            {/* Preview Drawer */}
            <PayoutPreviewDrawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              payout={selectedPayout}
              onDelete={(payout) => {
                setSelectedPayout(payout);
                setDeletePayoutOpen(true);
              }}
            />

            {/* Withdraw Modal */}
            <WithdrawFundsModal
              open={withdrawOpen}
              onOpenChange={setWithdrawOpen}
            />

            {/* Add/Edit Bank */}
            <BankAccountModal
              open={bankModalOpen}
              onOpenChange={setBankModalOpen}
              account={selectedBank}
              onSave={(account) => {
                console.log(account);
              }}
            />

            {/* Delete Payout */}
            <DeleteConfirmationDialog
              open={deletePayoutOpen && !!selectedPayout}
              onOpenChange={setDeletePayoutOpen}
              title="Delete Payout"
              description="Are you sure you want to delete this payout record?"
              itemName={selectedPayout?.reference}
              onConfirm={async () => {
                setDeletePayoutOpen(false);
                setDrawerOpen(false);
                setSelectedPayout(null);
              }}
            />

            {/* Delete Bank */}
            <DeleteConfirmationDialog
              open={deleteBankOpen && !!selectedBank}
              onOpenChange={setDeleteBankOpen}
              title="Remove Bank Account"
              description="This bank account will no longer be available for future withdrawals."
              itemName={selectedBank?.bankName}
              onConfirm={async () => {
                setDeleteBankOpen(false);
                setSelectedBank(null);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
