"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function HighlightReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // 3D depth scale — video rises toward the viewer
  const { scrollYProgress: videoScroll } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"],
  });
  const rawVideoScale = useTransform(videoScroll, [0, 1], [0.92, 1]);
  const videoScale = useSpring(rawVideoScale, { stiffness: 100, damping: 25 });
  const rawRotateX = useTransform(videoScroll, [0, 1], [3, 0]);
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 25 });

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="relative bg-obsidian py-24 md:py-36 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,168,76,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-gold-500/40" />
            <span className="text-gold-500/70 text-[10px] tracking-[0.5em] uppercase font-medium font-body">
              Behind the Scenes
            </span>
            <div className="w-8 h-px bg-gold-500/40" />
          </div>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            The Work{" "}
            <span className="text-gold-gradient">Behind the Glory</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            Champions aren&apos;t made on fight night — they&apos;re built in the gym, through
            discipline, sacrifice, and relentless work. This is Daniel-raj in his element.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          ref={videoContainerRef}
          style={{
            scale: videoScale,
            rotateX,
            transformPerspective: 1200,
            willChange: "transform",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video container */}
          <div className="relative aspect-video bg-slate-dark border border-slate-border overflow-hidden group">
            <video
              ref={videoRef}
              src="/media/DanMotivation.MOV"
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />

            {/* Overlay when not playing */}
            <div
              className={`absolute inset-0 bg-obsidian/40 transition-opacity duration-500 pointer-events-none ${
                playing ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Centre play button */}
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-gold-500/60 bg-obsidian/50 backdrop-blur-sm flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all duration-300 rounded-full">
                {playing ? (
                  <Pause size={28} className="text-gold-400" />
                ) : (
                  <Play size={28} className="text-gold-400 ml-1" />
                )}
              </div>
            </button>

            {/* Bottom controls bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-center justify-between bg-gradient-to-t from-obsidian/80 to-transparent transition-opacity duration-300 ${
                playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="text-white/80 hover:text-gold-400 transition-colors"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="text-white/80 hover:text-gold-400 transition-colors"
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
              <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-body">
                Training Camp — Motivation
              </p>
            </div>

            {/* Top-left gold accent */}
            <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold-500/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-gold-500/40 to-transparent pointer-events-none" />
          </div>

          {/* Quote beneath video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <p
              className="text-white/60 text-lg md:text-xl italic max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              &ldquo;Every round in the gym is a round closer to the world title.
              There are no shortcuts — only the work.&rdquo;
            </p>
            <p className="text-gold-500/50 text-[10px] tracking-[0.4em] uppercase font-body mt-4">
              Daniel-raj Stoican
            </p>
          </motion.div>

          {/* Bottom accent line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-border to-transparent" />
            <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase font-body flex-shrink-0">
              Discipline &middot; Sacrifice &middot; Hunger
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-border to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
