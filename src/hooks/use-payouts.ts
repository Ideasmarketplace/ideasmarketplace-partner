"use client";

import { useCallback, useEffect, useState } from "react";
import Api from "@/utils/api";
import { csrfStore } from "@/utils/global-state-store";

// I haven't seen your payout routes file, so these paths are guesses from
// the controller names. Change them in this one place to match.
const PAYOUT_API = "partner/payouts";
const PATHS = {
  metrics: `${PAYOUT_API}/metrics`,
  list: PAYOUT_API,
  request: `${PAYOUT_API}/request`,
  cancel: (id: string) => `${PAYOUT_API}/${id}/cancel`,
};

export interface PayoutMetrics {
  availableBalance: number;
  pendingBalance: number;
  totalPaidOut: number;
  lastPayout: number;
  lastPayoutDate: string | null;
}

export interface Payout {
  _id: string;
  amount: number;
  status: string;
  reference?: string;
  createdAt: string;
  processedAt?: string;
}

interface Options {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export function usePayouts({
  page = 1,
  limit = 20,
  status,
  search,
}: Options = {}) {
  const [metrics, setMetrics] = useState<PayoutMetrics | null>(null);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    pages: 0,
  });
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingPayouts, setLoadingPayouts] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoadingMetrics(true);
      const res = await Api.get(PATHS.metrics);
      setMetrics(res.data?.success ? res.data.data : null);
    } catch (error) {
      console.error("Failed to fetch payout metrics:", error);
      setMetrics(null);
    } finally {
      setLoadingMetrics(false);
    }
  }, []);

  const fetchPayouts = useCallback(async () => {
    try {
      setLoadingPayouts(true);
      const res = await Api.get(PATHS.list, {
        params: { page, limit, status, search },
      });
      if (res.data?.success) {
        setPayouts(res.data.withdrawals || []);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch payouts:", error);
      setPayouts([]);
    } finally {
      setLoadingPayouts(false);
    }
  }, [page, limit, status, search]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);
  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const refresh = () => Promise.all([fetchMetrics(), fetchPayouts()]);

  // Both throw on failure so the caller can show the server's message.
  const requestWithdrawal = async (amount: number) => {
    await Api.post(
      PATHS.request,
      { amount },
      { headers: { "x-xsrf-token": csrfStore.getToken() } },
    );
    await refresh();
  };

  const cancelPayout = async (id: string) => {
    await Api.patch(
      PATHS.cancel(id),
      {},
      { headers: { "x-xsrf-token": csrfStore.getToken() } },
    );
    await refresh();
  };

  return {
    metrics,
    payouts,
    pagination,
    loadingMetrics,
    loadingPayouts,
    requestWithdrawal,
    cancelPayout,
  };
}
