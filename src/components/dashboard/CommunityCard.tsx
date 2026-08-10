"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface CommunityCardProps {
  totalMembers?: number;
  activeMembers?: number;
  growth?: number;
  engagement?: number;
}

export default function CommunityCard({
  totalMembers = 0,
  activeMembers = 0,
  growth = 0,
  engagement = 0,
}: CommunityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-emerald-700 p-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Community</h3>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Users className="h-5 w-5" />
        </div>
      </div>

      {/* Members */}
      <div className="mt-8">
        <h1 className="text-5xl font-bold tracking-tight">
          {totalMembers.toLocaleString()}
        </h1>

        <p className="mt-2 text-emerald-100">
          {activeMembers.toLocaleString()} Active Members
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-10 space-y-5">
        {/* Growth */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Growth</span>
            <span>{growth}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(growth, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-white"
            />
          </div>
        </div>

        {/* Engagement */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>Engagement</span>
            <span>{engagement}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(engagement, 100)}%` }}
              transition={{ duration: 1.2 }}
              className="h-full rounded-full bg-white"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
