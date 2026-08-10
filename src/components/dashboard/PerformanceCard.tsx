
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";

interface PerformanceMetric {
  label: string;
  value: string;
  change?: string;
}

interface PerformanceCardProps {
  overallScore?: number;
  performanceLabel?: string;
  metrics?: PerformanceMetric[];
}

export default function PerformanceCard({
  overallScore = 0,
  performanceLabel = "Getting Started",
  metrics = [],
}: PerformanceCardProps) {
  // SVG circle calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(overallScore, 0), 100);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Your Performance</p>

          <h3 className="mt-1 text-xl font-bold text-gray-900">
            {performanceLabel}
          </h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
          <Trophy className="h-6 w-6 text-indigo-600" />
        </div>
      </div>

      {/* Progress */}
      <div className="my-8 flex justify-center">
        <div className="relative h-36 w-36">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 144 144"
          >
            {/* Background */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#4F46E5"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {overallScore}%
            </span>

            <span className="text-sm text-gray-500">
              Overall
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.length > 0 ? (
          metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between"
            >
              <span className="text-gray-500">
                {metric.label}
              </span>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {metric.value}
                </p>

                {metric.change && (
                  <p className="flex items-center justify-end gap-1 text-sm text-green-600">
                    <ArrowUpRight size={14} />
                    {metric.change}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
            Performance data will appear here as your activity grows.
          </div>
        )}
      </div>
    </motion.div>
  );
}