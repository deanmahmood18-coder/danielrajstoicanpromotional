"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Record", href: "#accolades" },
  { label: "Management", href: "#management" },
  { label: "Highlights", href: "#highlights" },
  { label: "Sponsorship", href: "#sponsorship" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/danielrajstoican", icon: "IG" },
  { label: "Twitter", href: "https://twitter.com/danielrajboxer", icon: "X" },
  { label: "TikTok", href: "https://www.tiktok.com/@danielrajstoican", icon: "TT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-obsidian/90 backdrop-blur-xl border-b border-gold-500/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 border border-gold-500/30 group-hover:border-gold-500/60 flex items-center justify-center transition-all duration-300">
                <span
                  className="text-gold-500/80 group-hover:text-gold-400 text-[9px] leading-none tracking-[0.15em] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                >
                  DSR
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span
                  className="text-white text-[13px] tracking-[0.1em] group-hover:text-gold-400 transition-colors duration-300 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Daniel-Raj Stoican
                </span>
                <span className="text-gray-600 text-[8px] tracking-[0.35em] uppercase font-body leading-tight mt-0.5">
                  Professional Boxer
                </span>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-[10px] font-medium tracking-[0.22em] uppercase text-gray-500 hover:text-white transition-colors duration-300 group font-body py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500/50 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}

              {/* Divider */}
              <div className="w-px h-4 bg-slate-border/60 mx-1" />

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gold-400 text-[9px] tracking-[0.12em] uppercase font-body transition-colors duration-300"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <button
                onClick={() => handleNavClick("#contact")}
                className="ml-2 px-5 py-2 border border-gold-500/30 text-gold-500/80 text-[10px] font-medium tracking-[0.22em] uppercase hover:bg-gold-500 hover:text-obsidian hover:border-gold-500 transition-all duration-300 font-body"
              >
                Inquire
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-400 hover:text-gold-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-lg flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-16">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-gold-500/30 flex items-center justify-center">
                  <span
                    className="text-gold-500/80 text-[9px] leading-none tracking-[0.15em]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                  >
                    DSR
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-gold-400 p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white hover:text-gold-400 transition-colors text-3xl"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavClick("#contact")}
                className="mt-4 px-8 py-3 bg-gold-500 text-obsidian font-medium text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-colors"
              >
                Inquire
              </motion.button>
            </div>

            {/* Mobile social links */}
            <div className="px-6 py-6 flex items-center justify-center gap-6 border-t border-slate-border/30">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gold-400 text-xs tracking-[0.2em] uppercase font-body transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="px-6 py-4">
              <p className="text-center text-gray-600 text-[10px] tracking-[0.3em] uppercase font-body">
                Managed by Sunny Edwards
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
