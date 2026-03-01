"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Trophy, Star, Zap, Shield, Award, Crown, Medal } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    value: "42",
    suffix: "",
    label: "Wins",
    sublabel: "From 50 amateur bouts",
  },
  {
    value: "1",
    suffix: "st",
    label: "European Champion",
    sublabel: "First ever from Nottinghamshire",
  },
  {
    value: "9",
    suffix: "",
    label: "Major Titles",
    sublabel: "Across multiple nations",
  },
  {
    value: "757",
    suffix: "",
    label: "Boxers Outranked",
    sublabel: "Elite of Tournament — Sweden",
  },
];

const trophies = [
  {
    icon: Crown,
    title: "European Champion",
    subtitle: "First Ever from Nottinghamshire",
    description:
      "No fighter from Nottinghamshire had ever won a European amateur title. Daniel-raj wrote that history alone — a landmark achievement for an entire city and region.",
    tier: "gold",
    featured: true,
  },
  {
    icon: Trophy,
    title: "ABA Champion",
    subtitle: "First National Champion from Nottingham Since Carl Froch",
    description:
      "The national title no Nottingham boxer had claimed since the legendary Carl Froch. A crown that places him among the finest amateurs the city has ever produced.",
    tier: "gold",
    featured: true,
  },
  {
    icon: Star,
    title: "EM Elite Champion",
    subtitle: "East Midlands — Senior Elite",
    description:
      "Dominated the elite division at senior level, claiming the East Midlands title against the region's very best competition.",
    tier: "gold",
  },
  {
    icon: Award,
    title: "Elite Boxer of the Tournament",
    subtitle: "Sweden — 757 Competitors",
    description:
      "Named the standout performer from a field of 757 elite amateur boxers across a prestigious international tournament in Sweden.",
    tier: "gold",
  },
  {
    icon: Medal,
    title: "British Silver Medalist",
    subtitle: "National Championships",
    description:
      "Reached the final of the British National Championships — a testament to his consistency at the highest level of domestic amateur boxing.",
    tier: "gold",
  },
  {
    icon: Crown,
    title: "Romanian National Champion",
    subtitle: "Representing His Roots",
    description:
      "Born in Bucharest, Daniel-raj returned to compete for Romania and claimed the national title — honouring his heritage on the biggest stage.",
    tier: "gold",
  },
  {
    icon: Trophy,
    title: "Haringey Box Cup Winner",
    subtitle: "Prestigious Invitational Tournament",
    description:
      "Winner of the renowned Haringey Box Cup — one of the most respected invitational amateur boxing tournaments in Britain.",
    tier: "gold",
  },
  {
    icon: Zap,
    title: "1st Round KO — England Debut",
    subtitle: "International Stage",
    description:
      "His first appearance in an England vest ended before the second bell — a statement performance that announced his arrival on the international stage.",
    tier: "silver",
  },
  {
    icon: Shield,
    title: "Beat an Olympian",
    subtitle: "In His 30th Career Fight",
    description:
      "In just his 30th career fight, he defeated an Olympic-level competitor — the kind of opposition most fighters don't face until well beyond 100 bouts.",
    tier: "silver",
  },
];

// Scroll-driven counter — counts up based on scroll position
function ScrollDrivenCounter({
  value,
  suffix,
  scrollProgress,
}: {
  value: string;
  suffix: string;
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  const target = parseInt(value);
  const count = useTransform(scrollProgress, [0, 0.3, 0.8], [0, 0, target]);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const unsubscribe = count.on("change", (v) => setDisplayed(Math.round(v)));
    return unsubscribe;
  }, [count]);

  return (
    <span>
      {displayed}
      {suffix}
    </span>
  );
}

function TrophyCard({
  trophy,
  index,
}: {
  trophy: (typeof trophies)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = trophy.icon;

  // Scroll-linked scale-up reveal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: cardScale,
        opacity: cardOpacity,
        y: cardY,
        willChange: "transform",
      }}
      className={`trophy-card relative p-6 md:p-8 border bg-slate-mid flex flex-col gap-5 ${
        trophy.featured
          ? "border-gold-500/40 bg-gradient-to-br from-gold-500/[0.03] to-slate-mid"
          : "border-slate-border hover:border-gold-500/20"
      }`}
    >
      {trophy.featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold-600/60 via-gold-400/40 to-gold-600/60" />
      )}

      <div
        className={`w-10 h-10 flex items-center justify-center border ${
          trophy.tier === "gold"
            ? "border-gold-500/40 bg-gold-500/[0.06]"
            : "border-slate-border bg-slate-dark"
        }`}
      >
        <Icon
          size={18}
          className={trophy.tier === "gold" ? "text-gold-400" : "text-gray-500"}
        />
      </div>

      <div>
        <h3
          className={`text-xl md:text-2xl leading-tight mb-1 ${
            trophy.tier === "gold" ? "text-gold-400" : "text-white"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
        >
          {trophy.title}
        </h3>
        <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase font-medium mb-3 font-body">
          {trophy.subtitle}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed font-light">{trophy.description}</p>
      </div>
    </motion.div>
  );
}

export default function Accolades() {
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const heroInView = useInView(heroRef, { once: true });

  // European Championship image parallax
  const { scrollYProgress: heroImageScroll } = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });
  const heroImageY = useTransform(heroImageScroll, [0, 1], ["0%", "15%"]);
  const heroImageScale = useTransform(heroImageScroll, [0, 0.5, 1], [1.08, 1.02, 1]);

  // Stats bar scroll-driven counter
  const { scrollYProgress: statsScrollProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "center center"],
  });

  // Photo strip horizontal parallax
  const { scrollYProgress: stripProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const stripX0 = useTransform(stripProgress, [0, 1], ["-3%", "3%"]);
  const stripX2 = useTransform(stripProgress, [0, 1], ["3%", "-3%"]);

  const stripXValues = [stripX0, undefined, stripX2];

  return (
    <section
      id="accolades"
      className="relative bg-slate-dark overflow-hidden"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/12 to-transparent" />

      {/* European Championship hero block */}
      <div className="relative py-28 md:py-40 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.06)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Section label with background image */}
          <div ref={titleRef} className="mb-20 md:mb-28 relative overflow-hidden">
            {/* Background image */}
            <div className="absolute -top-16 right-0 md:-right-4 w-[200px] md:w-[400px] h-[280px] md:h-[480px] opacity-[0.07] pointer-events-none select-none">
              <Image
                src="/media/picture6.JPG"
                alt=""
                role="presentation"
                fill
                className="object-cover object-top"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-dark/50 to-slate-dark" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-transparent to-slate-dark/80" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 mb-5 relative z-10"
            >
              <div className="section-divider" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.45em] uppercase font-medium font-body">
                Accolades
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              }}
              className="text-white leading-[0.95] relative z-10"
            >
              The Record
            </motion.h2>
          </div>

          {/* Centrepiece — European Championship */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mb-24 md:mb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Image with parallax */}
              <div ref={heroImageRef} className="relative aspect-[4/5] overflow-hidden group">
                <motion.div
                  style={{ y: heroImageY, scale: heroImageScale, willChange: "transform" }}
                  className="absolute inset-0 w-full h-[120%] -top-[10%]"
                >
                  <Image
                    src="/media/european_champ.JPG"
                    alt="Daniel-raj Stoican celebrating his European Championship victory in Sweden — the first European Boxing Champion from Nottinghamshire"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 to-transparent" />
              </div>

              {/* Text */}
              <div>
                <p className="text-gold-500/70 text-[10px] tracking-[0.45em] uppercase font-medium mb-4 font-body">
                  The Crowning Achievement
                </p>
                <h3
                  className="text-white text-4xl md:text-5xl lg:text-6xl leading-[1] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  First European Champion
                  <br />
                  <span className="text-gold-gradient">from Nottinghamshire.</span>
                </h3>
                <p className="text-gray-400 text-base leading-[1.8] font-light mb-8 max-w-lg">
                  No fighter from the county had ever achieved this. In a tournament
                  featuring 757 of Europe&apos;s finest amateur boxers, Daniel-raj
                  was named Elite Boxer of the Tournament — at just 21 years old.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p
                      className="text-gold-400 text-3xl md:text-4xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                    >
                      42–8
                    </p>
                    <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1 font-body">Record</p>
                  </div>
                  <div className="w-px h-12 bg-slate-border" />
                  <div className="text-center">
                    <p
                      className="text-gold-400 text-3xl md:text-4xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                    >
                      21
                    </p>
                    <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1 font-body">Years Old</p>
                  </div>
                  <div className="w-px h-12 bg-slate-border" />
                  <div className="text-center">
                    <p
                      className="text-gold-400 text-3xl md:text-4xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                    >
                      1st
                    </p>
                    <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1 font-body">Ever</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar — scroll-driven counters */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-border mb-20 md:mb-28"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-dark p-6 md:p-8 text-center group hover:bg-obsidian transition-colors duration-300"
              >
                <div
                  className="text-3xl md:text-4xl text-gold-400 mb-2 leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  <ScrollDrivenCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    scrollProgress={statsScrollProgress}
                  />
                </div>
                <p className="text-white text-xs font-medium tracking-[0.15em] uppercase mb-1 font-body">
                  {stat.label}
                </p>
                <p className="text-gray-600 text-[11px] tracking-wide font-body">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>

          {/* Trophy grid — scroll-linked scale reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {trophies.map((trophy, i) => (
              <TrophyCard key={i} trophy={trophy} index={i} />
            ))}
          </div>

          {/* ABA National Championship — Featured Fight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-28"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-gold-500/40" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.45em] uppercase font-medium font-body">
                Featured Fight
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </div>
            <h3
              className="text-white text-center mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              }}
            >
              ABA National Championship{" "}
              <span className="text-gold-gradient">Victory</span>
            </h3>
            <p className="text-gray-500 text-sm text-center max-w-lg mx-auto leading-relaxed font-light mb-10">
              The first Nottingham boxer to claim the ABA national title since Carl Froch.
              Watch the moment history was made.
            </p>
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video bg-slate-dark border border-slate-border overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/ZCu83qrg218"
                  title="Daniel-Raj Stoican — ABA National Championship"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold-500/40 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-gold-500/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-gold-500/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 h-16 w-px bg-gradient-to-t from-gold-500/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Photo strip — horizontal parallax */}
          <motion.div
            ref={stripRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-3 gap-2 md:gap-3"
          >
            {[
              { src: "/media/IMG_6686.JPG", position: "center 20%", alt: "Daniel-raj Stoican competing in elite amateur boxing — Nottingham's European Champion in action" },
              { src: "/media/IMG_5231.JPG", position: "center 30%", alt: "Daniel-raj Stoican victorious after winning a championship bout — East Midlands boxing champion" },
              { src: "/media/IMG_8010.jpg", position: "center 35%", alt: "Daniel-raj Stoican ringside during competition — ABA National Champion from Nottinghamshire" },
            ].map(
              (img, i) => (
                <motion.div
                  key={i}
                  style={stripXValues[i] ? { x: stripXValues[i], willChange: "transform" } : {}}
                  className="relative aspect-square overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    style={{ objectPosition: img.position }}
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-obsidian/5 transition-colors duration-500" />
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
