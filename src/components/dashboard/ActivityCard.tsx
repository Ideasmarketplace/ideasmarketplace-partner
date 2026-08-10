"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock3, ShoppingBag, UserPlus } from "lucide-react";

export interface RecentTransaction {
  _id: string;
  senderId?: string;
  receiverId?: string;
  amount?: number;
  amountToBePaid?: number;
  partnerFee?: number;
  commissionFee?: number;
  paymentStatus?: string;
  createdAt: string;
  type?: string;
  reference?: string;
}

export interface RecentMember {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt: string;
  profileImage?: string;
  avatar?: string;
}

interface ActivityCardProps {
  recentTransactions?: RecentTransaction[];
  recentMembers?: RecentMember[];
  loading?: boolean;
}

interface Activity {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  createdAt: string;
  type: "transaction" | "member";
  amount?: number;
}

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return "";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getTimeAgo = (date: string) => {
  const createdAt = new Date(date).getTime();
  const now = Date.now();

  const difference = Math.max(0, now - createdAt);

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
  }

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getMemberName = (member: RecentMember) => {
  const name = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim();

  return name || member.email || "New member";
};

const getTransactionUser = (transaction: RecentTransaction) => {
  // The current aggregation may only return senderId.
  // We therefore don't assume sender details are available.
  return transaction.senderId
    ? `Member ${transaction.senderId.slice(-6)}`
    : "A member";
};

const getTransactionAction = (transaction: RecentTransaction) => {
  const amount =
    transaction.amountToBePaid ??
    transaction.amount ??
    transaction.partnerFee;

  if (amount !== undefined) {
    return `completed a purchase worth ${formatCurrency(amount)}`;
  }

  if (transaction.type) {
    return `completed a ${transaction.type.toLowerCase()} transaction`;
  }

  return "completed a transaction";
};

export default function ActivityCard({
  recentTransactions = [],
  recentMembers = [],
  loading = false,
}: ActivityCardProps) {
  const activities: Activity[] = [
    ...recentTransactions.map((transaction) => ({
      id: `transaction-${transaction._id}`,
      user: getTransactionUser(transaction),
      action: getTransactionAction(transaction),
      createdAt: transaction.createdAt,
      type: "transaction" as const,
      amount:
        transaction.amountToBePaid ??
        transaction.amount ??
        transaction.partnerFee,
    })),

    ...recentMembers.map((member) => ({
      id: `member-${member._id}`,
      user: getMemberName(member),
      avatar: member.profileImage ?? member.avatar,
      action: "joined your community",
      createdAt: member.createdAt,
      type: "member" as const,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Latest activities from your community
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
          View all
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 p-5"
            >
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[220px] flex-col items-center justify-center px-6 pb-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Clock3 className="h-5 w-5 text-gray-400" />
          </div>

          <h4 className="mt-4 font-semibold text-gray-900">
            No recent activity
          </h4>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Activities from your members and transactions will appear here.
          </p>
        </div>
      ) : (
        /* Activities */
        <div className="divide-y divide-gray-100">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              className="flex items-start gap-4 p-5 transition hover:bg-gray-50"
            >
              {/* Avatar / Icon */}
              {activity.avatar ? (
                <Image
                  src={activity.avatar}
                  alt={activity.user}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    activity.type === "transaction"
                      ? "bg-indigo-100"
                      : "bg-purple-100"
                  }`}
                >
                  {activity.type === "transaction" ? (
                    <ShoppingBag className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <UserPlus className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <p className="leading-7 text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                  <Clock3 size={15} />

                  <span>{getTimeAgo(activity.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

