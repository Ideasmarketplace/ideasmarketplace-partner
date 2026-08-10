"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";

interface BottomBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function BottomBanner({
  title = "🎉 You're doing amazing!",
  description = "Your earnings increased by 18% this month. Keep growing your community to unlock even more rewards and exclusive benefits.",
  buttonText = "Learn More",
  onClick,
}: BottomBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 p-8 text-white shadow-xl"
    >
      {/* Background Decoration */}

      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute -bottom-16 left-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      {/* Content */}

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-start gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Trophy className="h-8 w-8 text-yellow-300" />
          </div>

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles className="h-4 w-4 text-yellow-300" />

              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
                Achievement Unlocked
              </span>

            </div>

            <h2 className="text-2xl font-bold lg:text-3xl">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-indigo-100">
              {description}
            </p>

          </div>

        </div>

        {/* CTA */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={onClick}
          className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
        >
          {buttonText}

          <ArrowRight className="h-5 w-5" />
        </motion.button>

      </div>
    </motion.div>
  );
}