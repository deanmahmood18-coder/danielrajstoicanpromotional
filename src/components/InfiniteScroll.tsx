"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  "European Champion",
  "42 Wins",
  "ABA National Champion",
  "Elite Boxer of the Tournament",
  "First Ever from Nottinghamshire",
  "Beat an Olympian",
  "Romanian National Champion",
  "British Silver Medalist",
  "Haringey Box Cup Winner",
  "1st Round KO — England Debut",
];

function MarqueeRow({ direction, speed }: { direction: "left" | "right"; speed: number }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-6 md:gap-10 whitespace-nowrap w-max"
        animate={{ x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-10 shrink-0">
            <span className="font-heading text-white/[0.10] text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] select-none">
              {item}
            </span>
            <span className="text-electric-500/25 text-sm">&#9670;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative bg-obsidian py-8 md:py-12 overflow-hidden border-y border-slate-border/30"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.02)_0%,transparent_70%)] pointer-events-none" />
      <MarqueeRow direction="left" speed={35} />
      <MarqueeRow direction="right" speed={45} />
    </motion.div>
  );
}
