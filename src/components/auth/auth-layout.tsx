"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/assets/logo.png";
import { ShieldCheck, TrendingUp } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-grid]", { opacity: 0, duration: 1.4 }, 0)
          .from(
            "[data-orb]",
            { scale: 0.5, opacity: 0, duration: 1.8, stagger: 0.15 },
            0,
          )
          .from("[data-brand]", { y: -16, opacity: 0, duration: 0.7 }, 0.2)
          .from(
            "[data-headline]",
            { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 },
            0.35,
          )
          .from(
            "[data-card]",
            {
              y: 40,
              opacity: 0,
              scale: 0.92,
              duration: 0.9,
              stagger: 0.18,
              ease: "back.out(1.6)",
            },
            0.8,
          )
          .from("[data-footer]", { opacity: 0, duration: 0.8 }, 1.2);

        // Floating cards (inner element, so it never clashes with the entrance)
        gsap.to("[data-float]", {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.9,
          delay: 1.8,
        });

        // Pointer parallax on the orbs
        const aside = root.current?.querySelector("aside");
        const orbs = gsap.utils.toArray<HTMLElement>("[data-orb]");
        const movers = orbs.map((orb, i) => {
          const depth = 20 + i * 15;
          return {
            depth,
            x: gsap.quickTo(orb, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(orb, "y", { duration: 1.2, ease: "power3.out" }),
          };
        });

        const onMove = (e: Event) => {
          const { clientX, clientY } = e as PointerEvent;
          const nx = clientX / window.innerWidth - 0.5;
          const ny = clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.depth * 2);
            m.y(ny * m.depth * 2);
          });
        };

        aside?.addEventListener("pointermove", onMove);
        return () => aside?.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="grid min-h-screen bg-white lg:grid-cols-[1.1fr_1fr]"
    >
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex">
        {/* Grid texture */}
        <div
          data-grid
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        {/* Glow orbs */}
        <div
          data-orb
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/40 blur-3xl"
        />
        <div
          data-orb
          className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-3xl"
        />
        <div
          data-orb
          className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl"
        />

        {/* Top: logo */}
        <div data-brand className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-indigo-950/40">
            <Image src={Logo} alt="logo" width={28} height={28} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Partner Portal
          </span>
        </div>

        {/* Middle: headline + floating cards */}
        <div className="relative">
          <h2 className="max-w-md text-4xl font-semibold leading-[1.15] tracking-tight xl:text-5xl">
            <span data-headline className="block">
              Everything you manage,
            </span>
            <span
              data-headline
              className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
            >
              in one calm place.
            </span>
          </h2>
          <p
            data-headline
            className="mt-5 max-w-sm text-base leading-relaxed text-white/60"
          >
            Track performance, financials, network members and stay on top of
            every update, all from a single dashboard.
          </p>

          <div className="mt-12 flex items-start gap-4">
            <div data-card>
              <div
                data-float
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <p className="text-2xl font-semibold">+24.8%</p>
                <p className="text-xs text-white/50">Growth this quarter</p>
              </div>
            </div>

            <div data-card className="mt-8">
              <div
                data-float
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/15 text-indigo-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <p className="text-2xl font-semibold">Secure</p>
                <p className="text-xs text-white/50">Encrypted end to end</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p data-footer className="relative text-sm text-white/40">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <main className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.08),transparent)] lg:hidden" />
        <div className="relative z-10 w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image src={Logo} alt="logo" width={28} height={28} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Partner Portal
            </span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
