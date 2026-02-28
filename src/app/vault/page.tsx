"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function VaultPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim().toLowerCase() }),
      });

      if (res.ok) {
        setUnlocked(true);
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError("Invalid conviction key. Access denied.");
        setKey("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/media/opportunityisnow.JPG"
          alt="Daniel-raj Stoican"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-obsidian/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(8,8,8,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <AnimatePresence mode="wait">
          {unlocked ? (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 border-2 border-gold-500 rounded-full flex items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gold-400 text-3xl"
                >
                  &#10003;
                </motion.div>
              </motion.div>
              <h2
                className="text-white text-3xl mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                Access <span className="text-gold-gradient">Granted</span>
              </h2>
              <p className="text-gray-500 text-sm">Entering the vault...</p>
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Lock icon */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <div className="w-16 h-16 border border-gold-500/30 bg-obsidian/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                    <Lock size={24} className="text-gold-500/70" />
                  </div>
                </motion.div>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-px bg-gold-500/30" />
                  <span className="text-gold-500/60 text-[9px] tracking-[0.5em] uppercase font-body">
                    Restricted Access
                  </span>
                  <div className="w-8 h-px bg-gold-500/30" />
                </div>

                <h1
                  className="text-white text-3xl md:text-4xl mb-3 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  The Vault
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  This site is currently under restricted access.
                  Enter the conviction key to proceed.
                </p>
              </div>

              {/* Key input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter conviction key..."
                    autoFocus
                    className="w-full px-5 py-4 bg-white/[0.04] border border-gold-500/20 text-white text-sm tracking-wider placeholder-gray-600 rounded-none focus:outline-none focus:border-gold-500/60 focus:bg-gold-500/[0.03] transition-all duration-300 text-center"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !key.trim()}
                  className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs tracking-[0.25em] uppercase font-medium hover:bg-gold-500 hover:text-obsidian hover:border-gold-500 transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Unlock
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center justify-center gap-2 text-red-400/80 text-xs"
                    >
                      <AlertCircle size={12} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* DSR monogram */}
              <div className="mt-12 text-center">
                <div className="w-8 h-8 border border-gold-500/20 flex items-center justify-center mx-auto mb-3">
                  <span
                    className="text-gold-500/50 text-[8px] leading-none tracking-[0.15em]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
                  >
                    DSR
                  </span>
                </div>
                <p className="text-gray-700 text-[9px] tracking-[0.35em] uppercase font-body">
                  Built by DM Developers
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
