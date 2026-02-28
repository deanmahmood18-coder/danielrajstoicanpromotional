"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function DanielSunnyHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Cinematic dolly — image grows into view
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 1.05]);
  const imageScale = useSpring(rawImageScale, { stiffness: 100, damping: 30 });

  // Scroll-linked text (replaces useInView once-triggered)
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.85, 1], [0, 1, 1, 0.7]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);
  const textSmoothedY = useSpring(textY, { stiffness: 100, damping: 25 });

  // Section scale-down on exit
  const sectionScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.97]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale: sectionScale, transformOrigin: "center top" }}
      className="relative h-[80vh] min-h-[500px] max-h-[900px] overflow-hidden flex items-end"
    >
      {/* Background image with cinematic dolly */}
      <motion.div
        style={{ y: imageY, scale: isMobile ? rawImageScale : imageScale, willChange: "transform" }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/media/danielandsunny.jpg"
          alt="Daniel-raj Stoican with manager Sunny Edwards"
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/20" />
      </motion.div>

      {/* Content overlay — scroll-linked */}
      <motion.div
        style={{ opacity: textOpacity, y: textSmoothedY, willChange: "transform" }}
        className="relative z-10 w-full"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-medium font-body">
                The Professional Era
              </span>
            </div>

            <h2
              className="text-white leading-[0.92] mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              World-Class{" "}
              <span className="text-gold-gradient">Management.</span>
              <br />
              <span className="text-white/80">Elite Ambition.</span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-md leading-[1.75] font-light mb-8">
              Daniel-raj Stoican and Sunny Edwards — IBF World Flyweight Champion.
              The partnership built to take Nottingham&apos;s finest to the world stage.
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p
                  className="text-gold-400 text-2xl md:text-3xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  Sunny Edwards
                </p>
                <p className="text-gray-500 text-[10px] tracking-[0.35em] uppercase mt-1 font-body">
                  IBF World Champion &middot; Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/12 to-transparent z-10" />
    </motion.section>
  );
}
