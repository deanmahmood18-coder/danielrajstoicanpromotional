"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Download, Mail, Phone, CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  message: string;
};

const roleOptions = [
  "Boxing Promoter",
  "Sponsor / Brand Partner",
  "Broadcasting / Media",
  "Management Inquiry",
  "Other",
];

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-dark py-24 md:py-40 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="section-divider" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-medium">
              Inquiries
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-gold-500 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            }}
            className="text-white leading-none mb-4"
          >
            Start the{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #E2C878 0%, #C9A84C 60%, #A68B3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Conversation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
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
              <h3
                className="text-white text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
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
                <h4
                  className="text-white text-2xl leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Digital Press Kit
                </h4>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Download Daniel-raj&apos;s full press kit including stats,
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
              <p className="text-gray-600 text-xs mt-2 text-center">PDF · Available on request</p>
            </div>

            {/* Quick facts */}
            <div className="p-5 bg-obsidian border border-slate-border">
              <p
                className="text-white text-sm font-semibold tracking-widest uppercase mb-4"
              >
                At a Glance
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  ["Record", "42W — 8L (Amateur)"],
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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6 p-10 border border-gold-500/30 bg-gold-500/5"
              >
                <CheckCircle size={56} className="text-gold-400" />
                <div>
                  <h3
                    className="text-white text-3xl mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    Message Received
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed max-w-sm">
                    Thank you for reaching out. We review all serious inquiries
                    and will respond within 24–48 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-organization" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                      Organisation *
                    </label>
                    <input
                      id="contact-organization"
                      type="text"
                      name="organization"
                      required
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="Company / Promoter"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-role" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                    I am a... *
                  </label>
                  <select
                    id="contact-role"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-sm text-white rounded-none appearance-none cursor-pointer focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
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
                    <label htmlFor="contact-email" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 ..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-white text-sm placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-gray-400 text-xs tracking-widest uppercase mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interest, opportunity, or inquiry..."
                    className="w-full px-4 py-3 bg-white/[0.03] border border-[#22262E] text-white text-sm placeholder-gray-600 rounded-none resize-none focus:outline-none focus:border-gold-500 focus:bg-gold-500/[0.03] transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-obsidian font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
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

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
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
    </section>
  );
}
