"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Target, Globe, TrendingUp, Users, Megaphone, BarChart3 } from "lucide-react";

const sellingPoints = [
  {
    icon: Target,
    title: "A Story That Sells Itself",
    body: "Immigration. Poverty. Bullying. Triumph. Daniel-Raj's narrative is the kind of origin story that captivates audiences and builds lasting fanbases. This is a fighter people invest in emotionally.",
  },
  {
    icon: Globe,
    title: "Dual-Market Appeal",
    body: "Romanian-born, English-raised — his identity opens media and commercial opportunities across both Eastern Europe and the United Kingdom.",
  },
  {
    icon: TrendingUp,
    title: "Proven at the Highest Level",
    body: "42 wins from 50 bouts. An Olympian defeated. European gold. He enters the professional ranks as a known quantity — not a project, not a gamble.",
  },
];

const sponsorshipFeatures = [
  {
    icon: Megaphone,
    title: "Indirect Social Reach",
    stat: "2M+",
    body: "Daniel-Raj's network spans 2 million followers across connected social media platforms — a powerful, organic audience ready to engage with your brand.",
  },
  {
    icon: Users,
    title: "Custom Packages",
    stat: "Tailored",
    body: "Every sponsorship is built around your business. From fight-night branding to digital content, social features to event access — packages are designed to maximise your visibility.",
  },
  {
    icon: BarChart3,
    title: "Any Industry Welcome",
    stat: "All Sectors",
    body: "Whether you're a local business or a global brand, we create bespoke sponsorship packages suited to your budget, goals, and audience — ensuring real return on investment.",
  },
];

const milestones = [
  { stat: "42–8", label: "Amateur Record" },
  { stat: "European", label: "Champion" },
  { stat: "1st Round KO", label: "England Debut" },
  { stat: "21", label: "Years Old" },
];

export default function PromotersPortal() {
  const titleRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  // CTA banner parallax
  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });
  const bannerImageY = useTransform(bannerProgress, [0, 1], ["0%", "20%"]);
  const bannerImageScale = useTransform(bannerProgress, [0, 0.5, 1], [1.1, 1.03, 1]);
  const bannerTextY = useTransform(bannerProgress, [0, 1], ["0%", "8%"]);
  const bannerScale = useTransform(bannerProgress, [0, 0.85, 1], [1, 1, 0.97]);

  return (
    <section className="relative overflow-hidden">

      {/* ─── Why Daniel-Raj section (moved above CTA) ─── */}
      <div className="bg-obsidian py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-gold-500/40" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.45em] uppercase font-medium font-body">
                For Promoters
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </div>
            <h3
              className="text-white mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              Why{" "}
              <span className="text-gold-gradient">Daniel-Raj?</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed font-light">
              Three reasons this fighter stands apart from every other prospect
              at this level.
            </p>
          </motion.div>

          {/* Image + selling points — side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-start">
            {/* Boxing News image — left column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="relative overflow-hidden border border-gold-500/15 group">
                <Image
                  src="/media/whydaniel-raj.JPG"
                  alt="Daniel-raj Stoican featured in Boxing News magazine — Nottingham professional boxer and European Champion profiled in national press"
                  width={400}
                  height={560}
                  className="w-full h-auto grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
              </div>
              <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase text-center mt-3 font-body">
                Boxing News &middot; Feature Article
              </p>
            </motion.div>

            {/* Selling points — right column, stacked */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {sellingPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-6 md:p-7 border border-slate-border hover:border-gold-500/20 bg-slate-dark hover:bg-slate-mid transition-all duration-300 group flex gap-5 items-start"
                  >
                    <div className="w-10 h-10 shrink-0 bg-gold-500/[0.06] border border-gold-500/25 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors duration-300">
                      <Icon size={18} className="text-gold-400/80" />
                    </div>
                    <div>
                      <h4
                        className="text-white text-lg mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                      >
                        {point.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">{point.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Milestone strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-border"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-obsidian p-6 md:p-8 text-center"
              >
                <p
                  className="text-gold-400 text-2xl md:text-3xl mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  {m.stat}
                </p>
                <p className="text-gray-500 text-[10px] tracking-[0.35em] uppercase font-body">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Sponsorship Section ─── */}
      <div id="sponsorship" className="bg-slate-dark py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-gold-500/40" />
              <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-medium font-body">
                Partnerships
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </div>
            <h3
              className="text-white mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              Sponsorship{" "}
              <span className="text-gold-gradient">Opportunities</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              Custom sponsorship packages available for any type of business.
              Align your brand with one of Britain&apos;s most compelling rising athletes
              and tap into an engaged audience of over 2 million.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {sponsorshipFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-7 md:p-8 border border-slate-border hover:border-gold-500/25 bg-obsidian hover:bg-slate-mid/50 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-gold-500/[0.06] border border-gold-500/25 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors duration-300">
                      <Icon size={18} className="text-gold-400/80" />
                    </div>
                    <span
                      className="text-gold-400 text-2xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                    >
                      {feature.stat}
                    </span>
                  </div>
                  <h4
                    className="text-white text-lg mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{feature.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Sponsorship CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm mb-6 font-light">
              Interested in partnering with Daniel-Raj? Get in touch to discuss a package tailored to your business.
            </p>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-3 px-8 py-4 border border-gold-500/40 text-gold-400 text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-obsidian font-medium transition-all duration-300"
            >
              Discuss Sponsorship
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── Full-width cinematic CTA banner ─── */}
      <motion.div
        ref={bannerRef}
        style={{ scale: bannerScale, transformOrigin: "center top" }}
        className="relative h-[50vh] md:h-[60vh] min-h-[380px] md:min-h-[420px] flex items-center overflow-hidden"
      >
        <motion.div
          style={{ y: bannerImageY, scale: bannerImageScale, willChange: "transform" }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <Image
            src="/media/opportunityisnow.JPG"
            alt="Daniel-Raj Stoican — The Opportunity Is Now"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
        </motion.div>

        <motion.div
          style={{ y: bannerTextY }}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
        >
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-white leading-[0.92] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
              }}
            >
              The Opportunity
              <br />
              <span className="text-gold-gradient">Is Now.</span>
            </h2>

            <p
              className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed mb-8 font-light"
            >
              An elite amateur pedigree. A story that transcends the sport.
              World-class management already in place. The next step is yours.
            </p>

            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-4 px-8 py-4 bg-gold-500 text-obsidian font-medium text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
            >
              Start the Conversation
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
