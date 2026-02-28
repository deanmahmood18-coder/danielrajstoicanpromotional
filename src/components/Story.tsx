"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    year: "2004",
    location: "Bucharest, Romania",
    title: "Born Into Struggle",
    body: "Daniel-raj entered the world in Bucharest — a city where marble palaces sit beside crumbling estates. From his earliest years, he knew hardship as a daily reality: nights on the street, weeks without certainty, the weight of poverty pressing down on a child who had done nothing to deserve it.",
    image: "/media/IMG_2681.JPG",
    pull: "A boy born into nothing. Destined for everything.",
  },
  {
    year: "2014",
    location: "Sneinton, Nottingham",
    title: "A New Country. The Same Fight.",
    body: "His family saved everything for a single dream: England. Landing in Sneinton, one of Nottingham's most deprived districts, the streets were different but the struggle felt familiar. No connections. No safety net. Just an unshakeable belief that this country would give him the platform his talent deserved.",
    image: "/media/IMG_3584.JPG",
    pull: "Different country. Same hunger. Same fire.",
  },
  {
    year: "2018",
    location: "The Gym",
    title: "The Day He Found the Ring",
    body: "At 14, the bullying was relentless — the accent, the name, the outsider. He walked into a boxing gym and found what he'd been searching for his entire life: structure, purpose, and a way to channel every ounce of pain into something powerful. The ring taught him how to survive.",
    image: "/media/IMG_6668.JPG",
    pull: "Pain became power. The ring became home.",
  },
  {
    year: "2021",
    location: "First Bout — Age 17",
    title: "The Fighting Begins.",
    body: "At 17, he stepped between the ropes for the first time competitively. What followed was a meteoric rise — 42 wins from 50 bouts, an England debut finished with a first-round knockout, and a trajectory that marked him as the most exciting prospect Nottingham had produced in a generation.",
    image: "/media/IMG_7898.jpg",
    pull: "42 wins. One statement. Unstoppable.",
  },
  {
    year: "2025",
    location: "European Championship",
    title: "History Forged.",
    body: "He became the first-ever European Champion from Nottinghamshire. Named Elite Boxer of the Tournament out of 757 boxers in Sweden. A statement to every immigrant, every outsider, every kid from a broken neighbourhood: it is possible.",
    image: "/media/forged_in_history.jpg",
    pull: "The first ever. From Nottinghamshire to the top of Europe.",
  },
];

function CinematicChapter({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the progress for buttery feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  // Image transforms — slow zoom during pin
  const imageScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);

  // Text content — scroll-linked entrance and exit (crossfade between chapters)
  const textOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0.1, 0.3, 0.8, 1], [40, 0, 0, -30]);

  // Year text — large background element scales with scroll
  const yearScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const yearOpacity = useTransform(smoothProgress, [0, 0.15, 0.8, 1], [0, 0.04, 0.04, 0]);

  // Pull quote — delayed entrance
  const pullOpacity = useTransform(smoothProgress, [0.35, 0.5, 0.75, 1], [0, 1, 1, 0]);

  // Year/location pill — slightly earlier than main text
  const pillOpacity = useTransform(smoothProgress, [0.08, 0.25, 0.8, 1], [0, 1, 1, 0]);
  const pillX = useTransform(smoothProgress, [0.08, 0.25], [-20, 0]);

  const isLast = index === chapters.length - 1;

  // Last chapter lingers longer
  const containerHeight = isMobile
    ? (isLast ? "200vh" : "180vh")
    : (isLast ? "250vh" : "200vh");

  return (
    <div ref={containerRef} style={{ height: containerHeight }}>
      {/* Sticky inner — pins to viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed image with slow zoom */}
        <motion.div
          style={{ y: imageY, scale: imageScale, willChange: "transform" }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/30" />

        {/* Year — large background text, scroll-linked */}
        <motion.div
          style={{ scale: yearScale, opacity: yearOpacity, willChange: "transform" }}
          className="absolute top-1/2 -translate-y-1/2 right-6 md:right-16 pointer-events-none select-none"
        >
          <span
            className="text-white leading-none block"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(8rem, 20vw, 18rem)",
            }}
          >
            {chapter.year}
          </span>
        </motion.div>

        {/* Content — bottom left, scroll-linked */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24">
            <div className="max-w-xl">
              {/* Year + location pill */}
              <motion.div
                style={{ opacity: pillOpacity, x: pillX, willChange: "transform" }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="text-gold-400 text-lg md:text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  {chapter.year}
                </span>
                <div className="w-6 h-px bg-gold-500/40" />
                <span className="text-gold-500/60 text-[9px] tracking-[0.4em] uppercase font-body">
                  {chapter.location}
                </span>
              </motion.div>

              {/* Title + Body — scroll-linked */}
              <motion.div style={{ opacity: textOpacity, y: textY, willChange: "transform" }}>
                <h3
                  className="text-white leading-[1] mb-5"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  {chapter.title}
                </h3>

                <p className="text-gray-300/80 text-sm md:text-[15px] leading-[1.85] font-light mb-6 max-w-lg">
                  {chapter.body}
                </p>
              </motion.div>

              {/* Pull quote — delayed scroll-linked entrance */}
              <motion.p
                style={{ opacity: pullOpacity }}
                className="text-gold-500/50 text-xs tracking-[0.2em] uppercase font-body italic"
              >
                {chapter.pull}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/8 to-transparent" />
      </div>
    </div>
  );
}

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-obsidian"
    >
      {/* ─── Header ─── */}
      <div className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div ref={titleRef} className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center gap-4 mb-5"
            >
              <div className="w-8 h-px bg-gold-500/40" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-medium font-body">
                Origin
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white leading-[0.95] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              }}
            >
              The Long Road{" "}
              <span className="text-gold-gradient">to the Ring</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed font-light"
            >
              Every champion has a story. Few are written in circumstances
              as raw, as honest, or as extraordinary as his.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-gold-500/40 to-transparent mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Cinematic chapters — sticky scroll reveal ─── */}
      {chapters.map((chapter, i) => (
        <CinematicChapter key={i} chapter={chapter} index={i} />
      ))}

      {/* ─── Closing quote ─── */}
      <div className="py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center max-w-xl mx-auto px-6"
        >
          <div className="w-8 h-px bg-gold-500/30 mx-auto mb-8" />
          <blockquote
            className="text-white text-xl md:text-2xl lg:text-3xl leading-[1.5] italic mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            &ldquo;I didn&apos;t choose boxing. Boxing chose me when I needed
            it most — and now I owe it everything.&rdquo;
          </blockquote>
          <p className="text-gold-500/50 text-[10px] tracking-[0.45em] uppercase font-medium font-body">
            Daniel-raj Stoican
          </p>
        </motion.div>
      </div>
    </section>
  );
}
