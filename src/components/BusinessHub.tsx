"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Globe,
  TrendingUp,
  Users,
  Megaphone,
  BarChart3,
  Bell,
  CheckCircle,
  Send,
  Download,
  Mail,
  Phone,
} from "lucide-react";

/* ─── Data ─── */

const sellingPoints = [
  {
    icon: Target,
    title: "A Story That Sells Itself",
    body: "Immigration. Poverty. Bullying. Triumph. Daniel's narrative is the kind of origin story that captivates audiences and builds lasting fanbases. This is a fighter people invest in emotionally.",
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
    body: "Daniel's network spans 2 million followers across connected social media platforms — a powerful, organic audience ready to engage with your brand.",
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
  { stat: "42\u20138", label: "Amateur Record" },
  { stat: "European", label: "Champion" },
  { stat: "1st Round KO", label: "England Debut" },
  { stat: "21", label: "Years Old" },
];

const roleOptions = [
  "Boxing Promoter",
  "Sponsor / Brand Partner",
  "Broadcasting / Media",
  "Management Inquiry",
  "Other",
];

type ContactFormData = {
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  message: string;
};

/* ─── Component ─── */

export default function BusinessHub() {
  /* Refs & scroll */
  const bannerTitleRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerTitleInView = useInView(bannerTitleRef, { once: true });

  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });
  const bannerImageY = useTransform(bannerProgress, [0, 1], ["0%", "20%"]);
  const bannerImageScale = useTransform(bannerProgress, [0, 0.5, 1], [1.1, 1.03, 1]);
  const bannerTextY = useTransform(bannerProgress, [0, 1], ["0%", "8%"]);
  const bannerScale = useTransform(bannerProgress, [0, 0.85, 1], [1, 1, 0.97]);

  /* Newsletter state */
  const newsletterRef = useRef<HTMLDivElement>(null);
  const newsletterInView = useInView(newsletterRef, { once: true });
  const [nlEmail, setNlEmail] = useState("");
  const [nlFirstName, setNlFirstName] = useState("");
  const [nlSubmitted, setNlSubmitted] = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlLoading(true);
    setNlError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, firstName: nlFirstName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setNlSubmitted(true);
    } catch (err) {
      setNlError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setNlLoading(false);
    }
  };

  /* Contact state */
  const contactTitleRef = useRef<HTMLDivElement>(null);
  const contactTitleInView = useInView(contactTitleRef, { once: true });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");

  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setContactSubmitted(true);
    } catch (err) {
      setContactError(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">

      {/* ═══════════════════════════════════════════════════════
          ZONE 1 — SPONSORSHIP (from PromotersPortal)
          ═══════════════════════════════════════════════════════ */}

      {/* ─── Why Daniel ─── */}
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
              <span className="text-gold-500/70 font-heading text-sm tracking-[0.25em] uppercase">
                For Promoters
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </div>
            <h3 className="text-white font-heading text-[clamp(2rem,4vw,3.2rem)] tracking-[0.04em] uppercase leading-none mb-4">
              Why{" "}
              <span className="text-gold-gradient">Daniel?</span>
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
                  alt="Daniel Stoican featured in Boxing News magazine — Nottingham professional boxer and European Champion profiled in national press"
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
                      <h4 className="text-white font-heading text-lg tracking-wide mb-2">
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
                <p className="text-gold-400 font-heading text-3xl md:text-4xl tracking-wider mb-1">
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

      {/* ─── Sponsorship Features ─── */}
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
              <span className="text-gold-500/70 font-heading text-sm tracking-[0.25em] uppercase">
                Partnerships
              </span>
              <div className="w-8 h-px bg-gold-500/40" />
            </div>
            <h3 className="text-white font-heading text-[clamp(2rem,4vw,3.2rem)] tracking-[0.04em] uppercase leading-none mb-5">
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
                    <span className="text-gold-400 font-heading text-2xl tracking-wider">
                      {feature.stat}
                    </span>
                  </div>
                  <h4 className="text-white font-heading text-lg tracking-wide mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {feature.body}
                  </p>
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
              Interested in partnering with Daniel? Get in touch to discuss a package tailored to your business.
            </p>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-3 px-8 py-4 border border-gold-500/40 text-gold-400 font-heading text-sm tracking-[0.15em] uppercase hover:bg-gold-500 hover:text-obsidian transition-all duration-300"
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
            src="/media/whydaniel-raj.JPG"
            alt="Daniel Stoican — The Opportunity Is Now"
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
            ref={bannerTitleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={bannerTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-white font-display leading-[0.92] mb-6 text-[clamp(3rem,8vw,6.5rem)]">
              The Opportunity
              <br />
              <span className="text-gold-gradient">Is Now.</span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed mb-8 font-light">
              An elite amateur pedigree. A story that transcends the sport.
              World-class management already in place. The next step is yours.
            </p>

            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-4 px-8 py-4 bg-gold-500 text-obsidian font-heading text-sm tracking-[0.15em] uppercase hover:bg-gold-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
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

      {/* ═══════════════════════════════════════════════════════
          ZONE 2 — NEWSLETTER (compact)
          ═══════════════════════════════════════════════════════ */}

      <div
        id="newsletter"
        ref={newsletterRef}
        className="relative bg-obsidian py-16 md:py-20 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.05)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          {nlSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-8 border border-gold-500/30 bg-gold-500/[0.03] max-w-xl mx-auto"
            >
              <CheckCircle size={40} className="text-gold-400 mx-auto mb-4" />
              <h3 className="text-white font-heading text-3xl tracking-wide mb-2">
                You&apos;re In.
              </h3>
              <p className="text-gray-400 text-sm font-light">
                Welcome to the inner circle. Your first update will arrive soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
                {/* Left — heading */}
                <div className="shrink-0 mb-6 lg:mb-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-px bg-gold-500/40" />
                    <span className="text-gold-500/70 font-heading text-sm tracking-[0.25em] uppercase">
                      Stay Connected
                    </span>
                  </div>
                  <h2 className="text-white font-heading text-[clamp(1.6rem,3vw,2.4rem)] tracking-[0.04em] uppercase leading-none">
                    Join the{" "}
                    <span className="text-gold-gradient">Inner Circle</span>
                  </h2>
                </div>

                {/* Right — inline form */}
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex-1 flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={nlFirstName}
                    onChange={(e) => setNlFirstName(e.target.value)}
                    placeholder="First name"
                    className="form-input w-full sm:w-auto sm:flex-1 px-4 py-3 text-white text-sm placeholder-gray-600 rounded-none"
                  />
                  <input
                    type="email"
                    required
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="form-input w-full sm:w-auto sm:flex-1 px-4 py-3 text-white text-sm placeholder-gray-600 rounded-none"
                  />
                  <button
                    type="submit"
                    disabled={nlLoading}
                    className="group flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian font-heading text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {nlLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Bell size={14} />
                        Subscribe
                        <ArrowRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {nlError && (
                <p className="text-red-400 text-xs mt-3 text-center lg:text-right">
                  {nlError}
                </p>
              )}

              <p className="text-gray-600 text-[11px] mt-4 text-center lg:text-right font-light">
                One email per month. No spam. Unsubscribe at any time.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ZONE 3 — CONTACT
          ═══════════════════════════════════════════════════════ */}

      <div
        id="contact"
        className="relative bg-slate-dark py-24 md:py-40 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div ref={contactTitleRef} className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={contactTitleInView ? { opacity: 1 } : {}}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="section-divider" />
              <span className="text-gold-500 font-heading text-sm tracking-[0.25em] uppercase">
                Inquiries
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-gold-500 to-transparent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={contactTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white font-heading text-[clamp(2.5rem,7vw,5.5rem)] tracking-[0.04em] uppercase leading-none mb-4"
            >
              Start the{" "}
              <span className="text-gold-gradient">Conversation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contactTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base md:text-lg max-w-xl mx-auto"
            >
              Whether you&apos;re a promoter, sponsor, or media partner — we want
              to hear from you. Complete the form below for a professional response.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-white font-heading text-2xl tracking-wide mb-2">
                  Direct Lines
                </h3>
                <div className="w-12 h-px bg-gold-500 mb-6" />

                <div className="space-y-5">
                  <a
                    href="mailto:info@danielrajstoican.com"
                    className="flex items-center gap-4 p-4 border border-slate-border hover:border-gold-500/40 hover:bg-slate-mid transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                      <Mail size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs tracking-wider uppercase mb-0.5">
                        Email
                      </p>
                      <p className="text-white text-sm group-hover:text-gold-400 transition-colors">
                        info@danielrajstoican.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 border border-slate-border">
                    <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                      <Phone size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs tracking-wider uppercase mb-0.5">
                        Management
                      </p>
                      <p className="text-white text-sm">Via Sunny Edwards Management</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Press kit download */}
              <div className="p-6 border border-gold-500/30 bg-gradient-to-br from-gold-500/5 to-transparent">
                <div className="mb-4">
                  <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-2">
                    Media
                  </p>
                  <h4 className="text-white font-heading text-2xl tracking-wide leading-tight">
                    Digital Press Kit
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    Download Daniel&apos;s full press kit including stats,
                    bio, high-res images, and accolades summary.
                  </p>
                </div>
                <a
                  href="/media/press-kit.pdf"
                  download
                  className="inline-flex items-center gap-3 px-5 py-3 border border-gold-500 text-gold-400 text-sm font-semibold tracking-widest uppercase hover:bg-gold-500 hover:text-obsidian transition-all duration-300 w-full justify-center"
                >
                  <Download size={14} />
                  Download Press Kit
                </a>
                <p className="text-gray-600 text-xs mt-2 text-center">
                  PDF · Available on request
                </p>
              </div>

              {/* Quick facts */}
              <div className="p-5 bg-obsidian border border-slate-border">
                <p className="text-white font-heading text-sm tracking-[0.2em] uppercase mb-4">
                  At a Glance
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    ["Record", "42W \u2014 8L (Amateur)"],
                    ["Division", "TBC"],
                    ["Base", "Nottingham, England"],
                    ["Management", "Sunny Edwards"],
                    ["Status", "Turning Professional"],
                  ].map(([label, value]) => (
                    <li key={label} className="flex justify-between gap-4">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-medium text-right">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {contactSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6 p-10 border border-gold-500/30 bg-gold-500/5"
                >
                  <CheckCircle size={56} className="text-gold-400" />
                  <div>
                    <h3 className="text-white font-heading text-3xl tracking-wide mb-3">
                      Message Received
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed max-w-sm">
                      Thank you for reaching out. We review all serious inquiries
                      and will respond within 24-48 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                      >
                        Organisation *
                      </label>
                      <input
                        id="contact-organization"
                        type="text"
                        name="organization"
                        required
                        value={contactForm.organization}
                        onChange={handleContactChange}
                        placeholder="Company / Promoter"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-role"
                      className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                    >
                      I am a... *
                    </label>
                    <select
                      id="contact-role"
                      name="role"
                      required
                      value={contactForm.role}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-sm text-white rounded-none appearance-none cursor-pointer focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    >
                      <option value="" className="bg-[#0E1014] text-gray-400">
                        Select your role
                      </option>
                      {roleOptions.map((r) => (
                        <option key={r} value={r} className="bg-[#0E1014] text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        placeholder="+44 ..."
                        className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-gray-400 text-xs tracking-widest uppercase mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us about your interest, opportunity, or inquiry..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#1E2230] text-white text-sm placeholder-gray-600 rounded-none resize-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-obsidian font-heading text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {contactLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  {contactError && (
                    <p className="text-red-400 text-xs text-center">{contactError}</p>
                  )}

                  <p className="text-gray-600 text-xs text-center">
                    We respect your privacy. Information is kept strictly
                    confidential.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
