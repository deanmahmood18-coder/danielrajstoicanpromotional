"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bell, CheckCircle, ArrowRight, Calendar, Users, Zap } from "lucide-react";

const perks = [
  {
    icon: Calendar,
    title: "Monthly Updates",
    description: "Fight announcements, training camp insights, and career milestones delivered to your inbox.",
  },
  {
    icon: Users,
    title: "Inner Circle Access",
    description: "Behind-the-scenes content, exclusive photos, and personal messages from Daniel-raj.",
  },
  {
    icon: Zap,
    title: "First to Know",
    description: "Be the first to hear about fight dates, ticket pre-sales, and major news before anyone else.",
  },
];

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative bg-obsidian py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-gold-500/40" />
            <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-medium font-body">
              Stay Connected
            </span>
            <div className="w-8 h-px bg-gold-500/40" />
          </div>

          <h2
            className="text-white leading-[0.95] mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            Join the{" "}
            <span className="text-gold-gradient">Inner Circle</span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light">
            A monthly newsletter for those who want to follow Daniel-raj&apos;s
            journey from the inside. Fight updates, personal stories, and exclusive
            content — straight to your inbox.
          </p>
        </motion.div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                className="p-6 border border-slate-border bg-slate-dark/50 hover:border-gold-500/20 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 bg-gold-500/[0.06] border border-gold-500/25 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/10 transition-colors duration-300">
                  <Icon size={16} className="text-gold-400/80" />
                </div>
                <h4
                  className="text-white text-sm font-medium mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.05rem" }}
                >
                  {perk.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light">
                  {perk.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-8 border border-gold-500/30 bg-gold-500/[0.03]"
            >
              <CheckCircle size={40} className="text-gold-400 mx-auto mb-4" />
              <h3
                className="text-white text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                You&apos;re In.
              </h3>
              <p className="text-gray-400 text-sm font-light">
                Welcome to the inner circle. Your first update will arrive soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-2 font-body">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="form-input w-full px-4 py-3 text-white text-sm placeholder-gray-600 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-2 font-body">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="form-input w-full px-4 py-3 text-white text-sm placeholder-gray-600 rounded-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-obsidian font-semibold text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Bell size={14} />
                    Join the Inner Circle
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {error && (
                <p className="text-red-400 text-xs text-center">
                  {error}
                </p>
              )}

              <p className="text-gray-600 text-[11px] text-center font-light">
                One email per month. No spam. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
