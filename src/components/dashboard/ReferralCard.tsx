"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Share2,
  Facebook,
  Linkedin,
  Twitter,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReferralCardProps {
  referralCode?: string;
  totalMembers?: number;
}

export default function ReferralCard({
  referralCode,
  totalMembers = 0,
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const referralLink = referralCode
    ? `${process.env.NEXT_PUBLIC_APP_URL}/${referralCode}`
    : "";

  async function copyLink() {
    if (!referralLink) {
      toast.error("Referral link is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);

      setCopied(true);
      toast.success("Referral link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Unable to copy referral link.");
    }
  }

  const shareReferral = (platform: string) => {
    if (!referralLink) {
      toast.error("Referral link is not available.");
      return;
    }

    const text = encodeURIComponent(
      "Join my community on Ideas Marketplace."
    );

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        referralLink
      )}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        referralLink
      )}`,
    };

    if (platform === "share") {
      if (navigator.share) {
        navigator
          .share({
            title: "Join my community",
            text: "Join my community on Ideas Marketplace.",
            url: referralLink,
          })
          .catch(() => {});
      } else {
        copyLink();
      }

      return;
    }

    window.open(
      urls[platform],
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-black p-6 text-white shadow-xl"
    >
      {/* Header */}
      <div>
        <span className="inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
          Earn 5%
        </span>

        <h2 className="mt-4 text-2xl font-bold">
          Grow your network
        </h2>

        <p className="mt-3 text-sm leading-7 text-indigo-100">
          Invite creators to join your community and earn a commission
          whenever they complete a sale.
        </p>
      </div>

      {/* Network members */}
      <div className="mt-6 flex items-center">
        <div className="flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-sm font-semibold">
            {totalMembers > 0 ? totalMembers : "0"}
          </div>
        </div>

        <span className="ml-3 text-sm text-indigo-100">
          {totalMembers.toLocaleString()}{" "}
          {totalMembers === 1 ? "member" : "members"} in your network
        </span>
      </div>

      {/* Referral Link */}
      <div className="mt-8 rounded-2xl bg-yellow-400 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 truncate text-sm text-black">
            {referralLink || "Generating referral link..."}
          </div>

          <button
            onClick={copyLink}
            disabled={!referralLink}
            className="shrink-0 rounded-xl bg-white px-3 py-2 text-indigo-700 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Copy referral link"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Share */}
      <div className="mt-8">
        <p className="mb-3 text-sm text-indigo-100">
          Share on
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => shareReferral("facebook")}
            className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25"
            aria-label="Share on Facebook"
          >
            <Facebook size={18} />
          </button>

          <button
            onClick={() => shareReferral("twitter")}
            className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25"
            aria-label="Share on Twitter"
          >
            <Twitter size={18} />
          </button>

          <button
            onClick={() => shareReferral("linkedin")}
            className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </button>

          <button
            onClick={() => shareReferral("share")}
            className="rounded-xl bg-white/15 p-3 transition hover:bg-white/25"
            aria-label="Share referral link"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}