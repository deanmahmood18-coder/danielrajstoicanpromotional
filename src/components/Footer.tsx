"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/daniel_rajstoican?igsh=MWZ4bDZhNHk1d2YwOA%3D%3D&utm_source=qr" },
  { label: "TikTok", href: "https://www.tiktok.com/@dstoicanraj?_r=1&_t=ZN-94KvAZjdByh" },
];

const navItems = ["Story", "Accolades", "Management", "Highlights", "Sponsorship", "Newsletter", "Contact"];

export default function Footer() {
  return (
    <>
      <footer className="bg-obsidian border-t border-slate-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/media/logo.png"
                  alt="Daniel Stoican logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span
                  className="text-white text-sm tracking-[0.12em] font-display font-medium"
                >
                  Daniel Stoican
                </span>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed font-light max-w-xs">
                Professional boxer. European Champion. Managed by Sunny Edwards.
                Nottingham, England.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-gray-500 font-heading text-xs tracking-[0.25em] uppercase mb-4">
                Navigate
              </p>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((label) => (
                  <button
                    key={label}
                    onClick={() =>
                      document
                        .querySelector(`#${label.toLowerCase()}`)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-left text-gray-500 hover:text-gold-400 text-xs tracking-wide transition-colors font-body"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-gray-500 font-heading text-xs tracking-[0.25em] uppercase mb-4">
                Follow Daniel
              </p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gold-400 text-xs tracking-wide transition-colors font-body group inline-flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Site-wide credit — absolute bottom of entire site */}
      <div className="bg-obsidian border-t border-slate-border/40 py-5">
        <p className="text-gray-600 text-[10px] tracking-[0.35em] uppercase text-center font-body">
          Built By{" "}
          <span className="text-gray-500">DM Developers</span>
        </p>
      </div>
    </>
  );
}
