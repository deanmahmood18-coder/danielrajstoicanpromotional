"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Height", value: "6'0\"", unit: "ft", barPercent: 78 },
  { label: "Reach", value: "75\"", unit: "in", barPercent: 82 },
  { label: "Weight", value: "154", unit: "lbs", barPercent: 70 },
  { label: "Stance", value: "Orthodox", unit: "", barPercent: 100 },
];

export default function TaleOfTheTape() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="tale-of-the-tape"
      className="relative py-24 md:py-32 bg-obsidian overflow-hidden"
    >
      {/* Broadcast-style scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Ambient glow behind image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Broadcast header bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Live-style dot */}
            <div className="relative flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500/60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500" />
              </span>
              <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-body font-medium">
                Fighter Profile
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Tale of the <span className="text-gold-500">Tape</span>
          </h2>
        </motion.div>

        {/* Main layout: image left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Fighter image with broadcast frame */}
          <motion.figure
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-[480px] mx-auto lg:mx-0">
              {/* Corner brackets — broadcast graphic style */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-500/60 z-10" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-gold-500/60 z-10" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-gold-500/60 z-10" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-500/60 z-10" />

              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/media/picture6.JPG"
                  alt="Daniel-raj Stoican in competition stance ringside, Nottingham professional boxer and European Champion in the super welterweight division"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
                {/* Bottom gradient for name overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                {/* Side vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/30 via-transparent to-obsidian/30" />
              </div>

              {/* Name plate at bottom of image — broadcast lower-third style */}
              <figcaption className="absolute bottom-0 left-0 right-0 z-10 p-5">
                <div className="border-l-2 border-gold-500 pl-4">
                  <p
                    className="text-white text-2xl md:text-3xl leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600,
                    }}
                  >
                    Daniel-Raj
                  </p>
                  <p
                    className="text-gold-500 text-2xl md:text-3xl leading-none mt-0.5"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600,
                    }}
                  >
                    Stoican
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-body">
                      Super Welterweight
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold-500/40" />
                    <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-body">
                      Nottingham, UK
                    </span>
                  </div>
                </div>
              </figcaption>
            </div>
          </motion.figure>

          {/* Stats panel — broadcast graphic right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:pl-8"
          >
            {/* Stats container with subtle broadcast frame */}
            <div className="relative bg-slate-dark/60 backdrop-blur-sm border border-slate-border/50 p-6 md:p-8">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-500/60 to-transparent" />

              {/* Record badge */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-white/30 text-[9px] tracking-[0.5em] uppercase font-body mb-1">
                    Amateur Record
                  </p>
                  <p
                    className="text-white text-3xl md:text-4xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600,
                    }}
                  >
                    42
                    <span className="text-gold-500/30 mx-2">—</span>
                    8
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[9px] tracking-[0.5em] uppercase font-body mb-1">
                    Division
                  </p>
                  <p
                    className="text-gold-500/80 text-lg"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 500,
                    }}
                  >
                    Super Welterweight
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-border/50 mb-8" />

              {/* Individual stat rows — semantic description list */}
              <dl className="space-y-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <dt className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-body">
                        {stat.label}
                      </dt>
                      <dd className="flex items-baseline gap-1.5">
                        <span
                          className="text-white text-2xl md:text-3xl"
                          style={{
                            fontFamily:
                              "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 600,
                          }}
                        >
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="text-white/20 text-xs font-body">
                            {stat.unit}
                          </span>
                        )}
                      </dd>
                    </div>

                    {/* Animated stat bar */}
                    {stat.label !== "Stance" && (
                      <div className="relative h-[3px] w-full bg-slate-border/30 overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-500 to-gold-500/40"
                          initial={{ width: "0%" }}
                          animate={
                            isInView
                              ? { width: `${stat.barPercent}%` }
                              : { width: "0%" }
                          }
                          transition={{
                            duration: 1.2,
                            delay: 0.8 + i * 0.15,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                        {/* Glow on bar tip */}
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold-500/60 blur-[3px]"
                          initial={{ left: "0%" }}
                          animate={
                            isInView
                              ? { left: `${stat.barPercent}%` }
                              : { left: "0%" }
                          }
                          transition={{
                            duration: 1.2,
                            delay: 0.8 + i * 0.15,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    )}

                    {/* Stance gets a special treatment — icon-style */}
                    {stat.label === "Stance" && (
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex gap-[3px]">
                          {/* Simplified stance diagram */}
                          <div className="w-[3px] h-4 bg-gold-500/70 rounded-full" />
                          <div className="w-[3px] h-4 bg-gold-500/40 rounded-full mt-1" />
                        </div>
                        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-body">
                          Left foot forward
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </dl>

              {/* Bottom ticker-style info */}
              <dl className="mt-8 pt-5 border-t border-slate-border/30">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {[
                    { label: "Nationality", val: "Romanian-British" },
                    { label: "Age", val: "21" },
                    { label: "Gym", val: "Sneinton ABC, Nottingham" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <dt className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-body">
                        {item.label}
                      </dt>
                      <dd className="text-white/50 text-xs font-body">
                        {item.val}
                      </dd>
                      {i < 2 && (
                        <span className="text-slate-border ml-3">|</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
    </section>
  );
}
