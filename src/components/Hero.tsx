"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Dolly zoom — dramatic scale-up pulls viewer into the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rawImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imageScale = useSpring(rawImageScale, { stiffness: 100, damping: 30 });

  // Depth-of-field blur as user scrolls past
  const rawBlur = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 8]);
  const imageBlur = useSpring(rawBlur, { stiffness: 100, damping: 30 });
  const blurFilter = useTransform(imageBlur, (v: number) => `blur(${isMobile ? 0 : v}px)`);

  // Text departure — scale down + translate + fade
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const rawTextScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const textScale = useSpring(rawTextScale, { stiffness: 120, damping: 25 });

  // Section scale-down on exit
  const sectionScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.97]);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={ref}
      id="hero"
      style={{ scale: sectionScale, transformOrigin: "center top" }}
      className="relative h-screen min-h-[700px] max-h-[1200px] w-full overflow-hidden"
    >
      {/* Background image with parallax + zoom */}
      {mounted && (
        <motion.div
          style={{ y: imageY, scale: isMobile ? rawImageScale : imageScale, filter: blurFilter, willChange: "transform" }}
          className="absolute inset-0 w-full h-[125%] -top-[12%]"
        >
          <Image
            src="/media/landing_photo.JPG"
            alt="Daniel-raj Stoican — Professional Boxer"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
          {/* Lighter overlays — let the image breathe */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-transparent to-transparent" />
        </motion.div>
      )}

      {/* Floating corner — management (top right) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-24 right-8 md:right-16 z-10 text-right hidden sm:block"
      >
        <div className="border-r border-gold-500/30 pr-5">
          <p className="text-gold-500/50 text-[9px] tracking-[0.5em] uppercase mb-1.5 font-body">
            Managed By
          </p>
          <p
            className="text-white/90 text-sm tracking-[0.18em]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Sunny Edwards
          </p>
        </div>
      </motion.div>

      {/* Record pill — top left with DSR monogram */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-24 left-6 md:left-12 z-10 hidden sm:flex items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-gold-500/40 to-transparent" />
        <div>
          <p className="text-gray-500 text-[9px] tracking-[0.5em] uppercase font-body">
            Amateur Record
          </p>
          <p
            className="text-white text-3xl mt-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
          >
            42 <span className="text-gold-500/40 text-2xl">—</span> 8
          </p>
        </div>
      </motion.div>

      {/* Hero text — positioned at bottom-left, compact to not cover the image */}
      {mounted && (
        <motion.div
          style={{ y: textY, opacity, scale: textScale, willChange: "transform" }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-28 md:pb-32">
            {/* Category tag */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex items-center gap-5 mb-5"
            >
              <div className="w-12 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
              <span className="text-gold-500/80 text-[10px] font-medium tracking-[0.5em] uppercase font-body">
                European Champion 2025
              </span>
            </motion.div>

            {/* Main headline — large but positioned bottom-left so photo stays visible */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="leading-[0.88] mb-5"
            >
              <span
                className="block text-[clamp(3rem,9vw,8rem)] text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                Daniel-Raj
              </span>
              <span
                className="block text-[clamp(3rem,9vw,8rem)] text-gold-gradient"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                Stoican
              </span>
            </motion.h1>

            {/* Tagline + sub-headline inline for compactness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mb-8"
            >
              <p
                className="text-[clamp(0.9rem,2vw,1.35rem)] tracking-[0.25em] uppercase text-white/50 mb-3"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                The Chosen One from Nottingham
              </p>
              <p className="text-gray-400 text-sm md:text-base max-w-md leading-[1.7] font-light">
                <span className="text-white/70">
                  Nottingham&apos;s First European Champion Since Brian Clough.
                </span>
                <br />
                <span className="text-white/70">
                  Nottingham&apos;s First National Champion Since Carl Froch.
                </span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => scrollToSection("#story")}
                className="group flex items-center gap-3 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian font-semibold text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]"
              >
                Discover the Journey
              </button>

              <button
                onClick={() => scrollToSection("#accolades")}
                className="group flex items-center gap-3 px-7 py-3.5 border border-white/15 text-gray-300 hover:border-gold-500/40 hover:text-gold-400 font-medium text-[11px] tracking-[0.25em] uppercase transition-all duration-300"
              >
                View Record
                <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">
                  &rarr;
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-[8px] tracking-[0.5em] uppercase font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-gold-500/40" />
        </motion.div>
      </motion.div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/12 to-transparent z-10" />
    </motion.section>
  );
}
