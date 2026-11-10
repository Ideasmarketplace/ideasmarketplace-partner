"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AnimatedContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.querySelectorAll(":scope > *:not([data-pop])"), {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.1,
          clearProps: "opacity,transform",
        });

        gsap.from(ref.current!.querySelectorAll("[data-pop]"), {
          scale: 0,
          rotate: -25,
          duration: 0.7,
          ease: "back.out(2.2)",
          delay: 0.15,
        });
      });
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}