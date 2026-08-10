"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  Send,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const suggestions = [
  {
    icon: TrendingUp,
    text: "Show my sales this month",
  },
  {
    icon: Wallet,
    text: "How much have I earned?",
  },
  {
    icon: Users,
    text: "Community performance",
  },
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log(message);

    // TODO:
    // Send to your AI backend

    setMessage("");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl"
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

          <Bot size={24} />

        </div>

        <div>

          <h3 className="font-semibold">
            AI Assistant
          </h3>

          <div className="mt-1 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            <p className="text-xs text-slate-300">
              Online
            </p>

          </div>

        </div>

      </div>

      {/* Greeting */}

      <div className="mt-8">

        <div className="mb-4 flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-yellow-400"
          />

          <span className="text-sm font-medium">
            Suggested Questions
          </span>

        </div>

        <p className="text-sm leading-7 text-slate-300">
          Ask me anything about your assets,
          commissions, referrals, payouts or
          community insights.
        </p>

      </div>

      {/* Suggestions */}

      <div className="mt-8 space-y-3">

        {suggestions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.text}
              whileHover={{
                scale: 1.02,
                x: 4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setMessage(item.text)}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
            >
              <div className="rounded-xl bg-indigo-500/20 p-2">

                <Icon
                  size={18}
                  className="text-indigo-300"
                />

              </div>

              <span className="text-sm">
                {item.text}
              </span>

            </motion.button>
          );
        })}

      </div>

      {/* Spacer */}

      <div className="flex-1" />

      {/* Chat Input */}

      <div className="mt-8">

        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur">

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask AI..."
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleSend}
            className="rounded-xl bg-indigo-500 p-3 transition hover:bg-indigo-600"
          >
            <Send size={18} />
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}