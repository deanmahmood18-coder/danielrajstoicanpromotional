"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Shield, TrendingUp, Users, Star } from "lucide-react";

const credentialPoints = [
  {
    icon: Shield,
    title: "Managed by Sunny Edwards",
    body: "World champion at flyweight, IBF title holder — as a Sunny Edwards management athlete, Daniel-raj has world-class guidance and a deep network across the global professional boxing landscape.",
  },
  {
    icon: TrendingUp,
    title: "Professional Boxing Career Begins",
    body: "After an extraordinary amateur career — 50 bouts, European Champion, East Midlands Boxing Champion, ABA Champion — this Nottingham professional boxer is ready for the professional stage.",
  },
  {
    icon: Users,
    title: "Elite Amateur Foundation",
    body: "42 wins from 50 bouts. International competition at the highest level. An Olympian defeated. The amateur record alone is a résumé most professionals never build.",
  },
  {
    icon: Star,
    title: "The Right Moment",
    body: "The story, the skills, the credentials, and the management are all in place. Daniel-raj is entering the professional ranks at exactly the right time.",
  },
];

export default function Management() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  // Split reveal — opposing parallax directions
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const cardSmoothed = useSpring(cardY, { stiffness: 80, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="management"
      className="relative bg-obsidian py-28 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(201,168,76,0.03)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Image block with upward parallax */}
          <motion.div
            style={{ y: leftY, willChange: "transform" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/media/IMG_7038.jpg"
                alt="Daniel-raj Stoican, Nottingham professional boxer preparing for his professional boxing career under Sunny Edwards management"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/20" />
            </div>

            {/* Floating credential card — independent parallax */}
            <motion.div
              style={{ y: cardSmoothed }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 right-0 md:right-0 bg-slate-mid border border-gold-500/25 p-4 md:p-6 max-w-[220px] md:max-w-xs gold-glow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500/[0.06] border border-gold-500/25 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-500/60 text-[10px] tracking-[0.35em] uppercase font-medium mb-1 font-body">
                    Represented By
                  </p>
                  <p
                    className="text-white text-lg leading-tight mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    Sunny Edwards
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed font-light">
                    IBF World Flyweight Champion
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Small secondary image */}
            <div className="absolute -top-3 left-0 md:-top-5 md:-left-6 w-20 h-28 md:w-32 md:h-44 overflow-hidden border border-slate-dark">
              <Image
                src="/media/IMG_4107.jpg"
                alt="Daniel-raj Stoican training at the gym in Nottingham — East Midlands boxing champion in preparation"
                fill
                className="object-cover object-center"
                sizes="150px"
              />
            </div>
          </motion.div>

          {/* Right — Content with downward parallax */}
          <motion.div style={{ y: rightY, willChange: "transform" }}>
            <div ref={titleRef} className="mb-10">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={titleInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="flex items-center gap-4 mb-5"
              >
                <div className="section-divider" />
                <span className="text-gold-500/70 text-[10px] tracking-[0.45em] uppercase font-medium font-body">
                  Professional Era
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                }}
                className="text-white leading-[0.95] mb-7"
              >
                The Next{" "}
                <span className="text-gold-gradient">Chapter</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 text-base leading-[1.8] font-light"
              >
                The amateur journey is complete. The résumé is built. The management
                is in place. Daniel-raj Stoican — Nottingham&apos;s European Champion and
                the East Midlands&apos; finest boxing prospect — is ready for his professional boxing career.
              </motion.p>
            </div>

            {/* Credential list */}
            <div className="space-y-5">
              {credentialPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex gap-5 p-4 border border-slate-border hover:border-gold-500/20 hover:bg-slate-mid/40 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-slate-dark border border-slate-border group-hover:border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300">
                      <Icon size={15} className="text-gold-500/70" />
                    </div>
                    <div>
                      <h4
                        className="text-white text-sm font-medium tracking-wide mb-1"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {point.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">
                        {point.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-obsidian font-medium text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
              >
                Get in Touch
                <span className="text-base">&rarr;</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
