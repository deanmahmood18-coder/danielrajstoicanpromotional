"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    year: "2004",
    location: "Bucharest, Romania",
    title: "Born Into Struggle",
    body: "Daniel-raj entered the world in Bucharest — a city where marble palaces sit beside crumbling estates. From his earliest years, he knew hardship as a daily reality: nights on the street, weeks without certainty, the weight of poverty pressing down on a child who had done nothing to deserve it.",
    image: "/media/childinromania.JPG",
    imagePosition: "center 20%",
    pull: "A boy born into nothing. Destined for everything.",
  },
  {
    year: "2014",
    location: "Sneinton, Nottingham",
    title: "A New Country. The Same Fight.",
    body: "His family saved everything for a single dream: England. Landing in Sneinton, one of Nottingham's most deprived districts, the streets were different but the struggle felt familiar. No connections. No safety net. Just an unshakeable belief that this country would give him the platform his talent deserved.",
    image: "/media/newcountry.jpg",
    imagePosition: "center 35%",
    pull: "Different country. Same hunger. Same fire.",
  },
  {
    year: "2018",
    location: "The Gym",
    title: "The Day He Found the Ring",
    body: "At 14, the bullying was relentless — the accent, the name, the outsider. He walked into a boxing gym and found what he'd been searching for his entire life: structure, purpose, and a way to channel every ounce of pain into something powerful. The ring taught him how to survive.",
    image: "/media/firststartedboxing.JPG",
    imagePosition: "center 25%",
    pull: "Pain became power. The ring became home.",
  },
  {
    year: "2021",
    location: "First Bout — Age 17",
    title: "The Fighting Begins.",
    body: "At 17, he stepped between the ropes for the first time competitively. What followed was a meteoric rise — 42 wins from 50 bouts, an England debut finished with a first-round knockout, and a trajectory that marked him as the most exciting prospect Nottingham had produced in a generation.",
    image: "/media/firstfight.jpg",
    imagePosition: "center 35%",
    pull: "42 wins. One statement. Unstoppable.",
  },
  {
    year: "2025",
    location: "European Championship",
    title: "History Forged.",
    body: "He became the first-ever European Champion from Nottinghamshire. Named Elite Boxer of the Tournament out of 757 boxers in Sweden. A statement to every immigrant, every outsider, every kid from a broken neighbourhood: it is possible.",
    image: "/media/IMG_6687.JPG",
    imagePosition: "center 20%",
    pull: "The first ever. From Nottinghamshire to the top of Europe.",
  },
  {
    year: "Now",
    location: "The Next Chapter",
    title: "The Opportunity Is Now.",
    body: "European Champion. ABA National Champion. Elite Boxer of the Tournament. The amateur chapter is complete — every box ticked, every record set. Now the professional stage awaits. The boy from Bucharest is ready to become a world champion.",
    image: "/media/IMG_4460.jpg",
    imagePosition: "center 30%",
    pull: "The amateur story ends. The professional era begins.",
  },
];

function ChapterProgressIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
      {chapters.map((ch, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <div key={i} className="flex flex-col items-center">
            {i > 0 && (
              <div
                className="w-px h-8 transition-all duration-700"
                style={{
                  background: isPast || isActive
                    ? "linear-gradient(to bottom, rgba(201,168,76,0.5), rgba(201,168,76,0.2))"
                    : "rgba(255,255,255,0.07)",
                }}
              />
            )}

            <div className="relative flex items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0.7,
                  opacity: isActive ? 1 : isPast ? 0.6 : 0.2,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-gold-500 shadow-[0_0_12px_rgba(201,168,76,0.5)]"
                      : isPast
                        ? "bg-gold-500/50"
                        : "bg-white/10 border border-white/10"
                  }`}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold-500/30"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>

              <motion.span
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 5 }}
                transition={{ duration: 0.3 }}
                className="absolute right-full mr-4 text-gold-500/70 text-[10px] tracking-[0.3em] uppercase font-body whitespace-nowrap"
              >
                {ch.year}
              </motion.span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CinematicChapter({
  chapter,
  index,
  onBecomeActive,
}: {
  chapter: (typeof chapters)[0];
  index: number;
  onBecomeActive: (index: number) => void;
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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.15 && v < 0.85) {
      onBecomeActive(index);
    }
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  // Image transforms
  const imageScale = useTransform(smoothProgress, [0, 1], [1.2, 1.0]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);

  // Image reveal — curtain wipe
  const clipProgress = useTransform(smoothProgress, [0, 0.2], [15, 0]);
  const imageClip = useTransform(clipProgress, (v: number) => `inset(0 0 ${v}% 0)`);

  // Image brightness — dark to revealed
  const imageBrightness = useTransform(smoothProgress, [0, 0.25], [0.3, 1]);
  const brightnessFilter = useTransform(imageBrightness, (v: number) => `brightness(${v})`);

  // Text content
  const textOpacity = useTransform(smoothProgress, [0.12, 0.3, 0.75, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0.12, 0.3, 0.75, 0.95], [50, 0, 0, -40]);

  // Title — separate, slightly earlier
  const titleOpacity = useTransform(smoothProgress, [0.08, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0.08, 0.25], [60, 0]);
  const titleScale = useTransform(smoothProgress, [0.08, 0.25], [0.95, 1]);

  // Year background
  const yearScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const yearOpacity = useTransform(smoothProgress, [0, 0.15, 0.75, 0.95], [0, 0.04, 0.04, 0]);

  // Pull quote
  const pullOpacity = useTransform(smoothProgress, [0.35, 0.5, 0.7, 0.9], [0, 1, 1, 0]);
  const pullX = useTransform(smoothProgress, [0.35, 0.5], [-15, 0]);

  // Pill
  const pillOpacity = useTransform(smoothProgress, [0.06, 0.22, 0.75, 0.95], [0, 1, 1, 0]);
  const pillX = useTransform(smoothProgress, [0.06, 0.22], [-20, 0]);

  // Chapter number
  const chapterNumOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.8, 0.95], [0, 0.5, 0.5, 0]);

  // Overlay darkness
  const overlayOpacity = useTransform(smoothProgress, [0, 0.15, 0.8, 1], [0.7, 0.35, 0.35, 0.7]);

  const isLast = index === chapters.length - 1;
  const containerHeight = isMobile
    ? "auto"
    : isLast ? "250vh" : "200vh";

  // ─── Mobile layout: image + text stacked, no sticky ───
  if (isMobile) {
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-60px" }}
        className="relative"
      >
        {/* Image in natural landscape ratio */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover"
            style={{ objectPosition: chapter.imagePosition }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-transparent" />

          {/* Year watermark */}
          <div className="absolute top-4 right-5 pointer-events-none select-none">
            <span
              className="text-white/[0.06] text-7xl leading-none block"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
            >
              {chapter.year}
            </span>
          </div>

          {/* Chapter number */}
          <div className="absolute top-4 left-5 z-10">
            <div className="flex items-center gap-2">
              <span className="text-gold-500/40 text-[9px] tracking-[0.4em] uppercase font-body">
                Chapter
              </span>
              <span
                className="text-gold-500/60 text-base"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Text content below image */}
        <div className="px-6 py-8 bg-obsidian">
          {/* Year + location */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-gold-400 text-lg"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
            >
              {chapter.year}
            </span>
            <div className="w-6 h-px bg-gold-500/40" />
            <span className="text-gold-500/60 text-[9px] tracking-[0.35em] uppercase font-body">
              {chapter.location}
            </span>
          </div>

          <h3
            className="text-white leading-[1.05] mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.75rem",
            }}
          >
            {chapter.title}
          </h3>

          <p className="text-gray-300/80 text-sm leading-[1.85] font-light mb-5">
            {chapter.body}
          </p>

          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-gold-500/40" />
            <p className="text-gold-500/60 text-[10px] tracking-[0.15em] uppercase font-body italic">
              {chapter.pull}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/8 to-transparent" />
      </motion.div>
    );
  }

  // ─── Desktop layout: cinematic sticky parallax ───
  return (
    <div ref={containerRef} style={{ height: containerHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed image with zoom + reveal */}
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
            clipPath: imageClip,
            filter: brightnessFilter,
            willChange: "transform",
          }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover"
            style={{ objectPosition: chapter.imagePosition }}
            sizes="100vw"
          />
        </motion.div>

        {/* Dynamic overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-obsidian"
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/20" />

        {/* Year — large background text */}
        <motion.div
          style={{ scale: yearScale, opacity: yearOpacity, willChange: "transform" }}
          className="absolute top-1/2 -translate-y-1/2 right-16 pointer-events-none select-none"
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

        {/* Chapter number — top left */}
        <motion.div
          style={{ opacity: chapterNumOpacity }}
          className="absolute top-24 left-12 z-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-gold-500/40 text-[10px] tracking-[0.5em] uppercase font-body">
              Chapter
            </span>
            <span
              className="text-gold-500/60 text-xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Content — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-10 lg:px-16 pb-24">
            <div className="max-w-xl">
              {/* Year + location pill */}
              <motion.div
                style={{ opacity: pillOpacity, x: pillX, willChange: "transform" }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="text-gold-400 text-xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  {chapter.year}
                </span>
                <div className="w-8 h-px bg-gold-500/40" />
                <span className="text-gold-500/60 text-[9px] tracking-[0.4em] uppercase font-body">
                  {chapter.location}
                </span>
              </motion.div>

              {/* Title with scale entrance */}
              <motion.div
                style={{
                  opacity: titleOpacity,
                  y: titleY,
                  scale: titleScale,
                  willChange: "transform",
                }}
              >
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
              </motion.div>

              {/* Body text */}
              <motion.div style={{ opacity: textOpacity, y: textY, willChange: "transform" }}>
                <p className="text-gray-300/80 text-[15px] leading-[1.85] font-light mb-6 max-w-lg">
                  {chapter.body}
                </p>
              </motion.div>

              {/* Pull quote with slide */}
              <motion.div
                style={{ opacity: pullOpacity, x: pullX }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-px bg-gold-500/40" />
                <p className="text-gold-500/60 text-xs tracking-[0.2em] uppercase font-body italic">
                  {chapter.pull}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/8 to-transparent" />
      </div>
    </div>
  );
}

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const [activeChapter, setActiveChapter] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const { scrollYProgress: storySectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(storySectionProgress, "change", (v) => {
    setShowProgress(v > 0.02 && v < 0.98);
  });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-obsidian"
    >
      {/* Chapter progress indicator */}
      <motion.div
        animate={{ opacity: showProgress ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none"
      >
        <ChapterProgressIndicator activeIndex={activeChapter} />
      </motion.div>

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

      {/* ─── Cinematic chapters ─── */}
      {chapters.map((chapter, i) => (
        <CinematicChapter
          key={i}
          chapter={chapter}
          index={i}
          onBecomeActive={setActiveChapter}
        />
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
