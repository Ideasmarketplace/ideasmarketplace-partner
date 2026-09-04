"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  BarChart3,
  Users,
  ImageIcon,
  FileText,
  Wallet,
  Download,
  Sparkles,
} from "lucide-react";

// Positioned strictly at the outer 4 tips of the X-shape
const cards = [
  {
    title: "Performance",
    subtitle: "+18% Growth",
    icon: BarChart3,
    color: "text-blue-600",
    bg: "bg-blue-50",
    className: "top-2 left-0", // Top-Left Tip
    targetX: 50,
    targetY: 45,
  },
  {
    title: "Assets",
    subtitle: "148 Files",
    icon: ImageIcon,
    color: "text-pink-600",
    bg: "bg-pink-50",
    className: "top-2 right-0", // Top-Right Tip
    targetX: 370,
    targetY: 45,
  },
  {
    title: "Contributors",
    subtitle: "12 Active",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
    className: "bottom-2 left-0", // Bottom-Left Tip
    targetX: 50,
    targetY: 285,
  },
  {
    title: "Downloads",
    subtitle: "1240 Total",
    icon: Download,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    className: "bottom-2 right-0", // Bottom-Right Tip
    targetX: 370,
    targetY: 285,
  },
];

export default function AssetIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useGSAP(
    () => {
      // 1. Prepare SVG line animation lengths
      linesRef.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      // 2. Main Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        orbRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 }
      )
        .to(
          linesRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .fromTo(
          cardsRef.current,
          { y: 20, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .fromTo(
          badgeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      // 3. Floating Motion
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: index % 2 === 0 ? -6 : 6,
          duration: 2.2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });

      // Center Orb Pulse
      gsap.to(orbRef.current, {
        scale: 1.08,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative hidden h-[330px] w-[500px] xl:block"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-blue-200/20 blur-3xl" />

      {/* Center Orb */}
      <div
        ref={orbRef}
        className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl"
      >
        <Sparkles className="h-8 w-8 text-sky-600" />
      </div>

      {/* Connecting X-Lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 330"
      >
        {cards.map((card, i) => (
          <line
            key={card.title}
            ref={(el) => {
              linesRef.current[i] = el;
            }}
            x1="250"
            y1="165"
            x2={card.targetX}
            y2={card.targetY}
            stroke="#93c5fd"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        ))}
      </svg>

      {/* Floating Cards Anchored to Each Tip */}
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`absolute z-20 w-44 rounded-2xl border border-white/60 bg-white/80 p-3.5 shadow-xl backdrop-blur-xl transition-transform duration-300 hover:scale-105 ${card.className}`}
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-2.5 ${card.bg}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-500">{card.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}