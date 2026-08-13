"use client";

import { useEffect, useState } from "react";

import Api from "@/utils/api";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import {
  mockBankAccounts,
  Payout,
  BankAccount,
  PayoutMetricCards,
  PayoutTable,
  PayoutPreviewDrawer,
  WithdrawFundsModal,
  HowPayoutWorks,
  BankAccountsCard,
  BankAccountModal,
  PayoutSummary
} from "@/components/payouts";


interface PayoutResponse {
  payouts?: Payout[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function PayoutsPage() {
  const [selectedPayout, setSelectedPayout] =
    useState<Payout | null>(null);

  const [selectedBank, setSelectedBank] =
    useState<BankAccount | null>(null);

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bankModalOpen, setBankModalOpen] = useState(false);

  const [deletePayoutOpen, setDeletePayoutOpen] = useState(false);
  const [deleteBankOpen, setDeleteBankOpen] = useState(false);

  const [payoutSummary, setPayoutSummary] =
    useState<PayoutSummary | null>(null);

  const [payouts, setPayouts] = useState<Payout[]>([]);

  const [summaryLoading, setSummaryLoading] = useState(true);
  const [payoutsLoading, setPayoutsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  /*
   * Fetch payout summary
   */
  const fetchPayoutSummary = async () => {
    setSummaryLoading(true);

    try {
      const response = await Api.get("/partner/payouts/summary");

      if (response.data?.success) {
        setPayoutSummary(
          response.data.data || response.data,
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch payout summary:",
        error,
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  /*
   * Fetch payout history
   */
  const fetchPayouts = async () => {
    setPayoutsLoading(true);

    try {
      const response = await Api.get("/partner/payouts", {
        params: {
          page,
          limit: pageSize,
        },
      });

      if (response.data?.success) {
        const responseData = response.data;

        const result: PayoutResponse =
          responseData.data || responseData;

        setPayouts(result.payouts || []);

        setTotalPages(
          result.pagination?.pages || 1,
        );

        setTotalItems(
          result.pagination?.total || 0,
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch payouts:",
        error,
      );

      setPayouts([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setPayoutsLoading(false);
    }
  };

  /*
   * Initial summary
   */
  useEffect(() => {
    fetchPayoutSummary();
  }, []);

  /*
   * Payout history
   */
  useEffect(() => {
    fetchPayouts();
  }, [page]);

  /*
   * View payout details
   */
  const handleViewPayout = async (
    payout: Payout,
  ) => {
    try {
      const payoutId =
        (payout as any)._id ||
        (payout as any).id;

      const response = await Api.get(
        `/partner/payouts/${payoutId}`,
      );

      if (response.data?.success) {
        setSelectedPayout(
          response.data.data ||
            response.data.payout ||
            response.data,
        );

        setDrawerOpen(true);
      }
    } catch (error) {
      console.error(
        "Failed to fetch payout details:",
        error,
      );

      /*
       * Fall back to the table record.
       */
      setSelectedPayout(payout);
      setDrawerOpen(true);
    }
  };

  /*
   * Cancel payout
   */
  const handleCancelPayout = async () => {
    if (!selectedPayout) return;

    try {
      const payoutId =
        (selectedPayout as any)._id ||
        (selectedPayout as any).id;

      await Api.patch(
        `/partner/payouts/${payoutId}/cancel`,
      );

      setDeletePayoutOpen(false);
      setDrawerOpen(false);
      setSelectedPayout(null);

      await fetchPayoutSummary();
      await fetchPayouts();
    } catch (error) {
      console.error(
        "Failed to cancel payout:",
        error,
      );
    }
  };

  /*
   * Request withdrawal
   *
   * The payload should match whatever
   * WithdrawFundsModal sends.
   */
  const handleWithdraw = async (
    payload: any,
  ) => {
    try {
      await Api.post(
        "/partner/payouts/request",
        payload,
      );

      setWithdrawOpen(false);

      /*
       * Refresh both the summary and
       * payout history after withdrawal.
       */
      await fetchPayoutSummary();
      await fetchPayouts();
    } catch (error) {
      console.error(
        "Failed to request withdrawal:",
        error,
      );
    }
  };

  return (
    <div className="min-h-screen flex-1">
      {/* Main Content */}
      <main className="space-y-6">
        {/* Header */}
        <section>
          <h1 className="text-4xl font-bold tracking-tight">
            Payouts
          </h1>

          <p className="mt-2 text-muted-foreground">
            Withdraw your earnings and manage your payout accounts.
          </p>
        </section>

        {/* Metric Cards */}
        <PayoutMetricCards
          data={payoutSummary}
          loading={summaryLoading}
          onWithdraw={() =>
            setWithdrawOpen(true)
          }
        />

        {/* Table */}
        <PayoutTable
          data={payouts}
          loading={payoutsLoading}
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          onView={handleViewPayout}
          onDelete={(payout) => {
            setSelectedPayout(payout);
            setDeletePayoutOpen(true);
          }}
        />

        {/* Information */}
        <section className="grid gap-6 xl:grid-cols-2">
          <HowPayoutWorks />

          {/* <BankAccountsCard
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
          /> */}
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
          onSubmit={handleWithdraw}
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
          open={
            deletePayoutOpen &&
            !!selectedPayout
          }
          onOpenChange={setDeletePayoutOpen}
          title="Delete Payout"
          description="Are you sure you want to delete this payout record?"
          itemName={selectedPayout?.reference}
          onConfirm={handleCancelPayout}
        />

        {/* Delete Bank */}
        <DeleteConfirmationDialog
          open={
            deleteBankOpen &&
            !!selectedBank
          }
          onOpenChange={setDeleteBankOpen}
          title="Remove Bank Account"
          description="This bank account will no longer be available for future withdrawals."
          itemName={selectedBank?.bankName}
          onConfirm={async () => {
            setDeleteBankOpen(false);
            setSelectedBank(null);
          }}
        />
      </main>
    </div>
  );
}
