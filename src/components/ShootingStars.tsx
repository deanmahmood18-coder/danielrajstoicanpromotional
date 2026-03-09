"use client";

import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let lightningFlashes: Lightning[] = [];

    interface Star {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      fadeState: "in" | "visible" | "out";
      life: number;
      maxLife: number;
      width: number;
    }

    interface Lightning {
      segments: { x1: number; y1: number; x2: number; y2: number }[];
      opacity: number;
      life: number;
      maxLife: number;
      fadeState: "flash" | "out";
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (): Star => {
      const angle = (Math.random() * 40 + 20) * (Math.PI / 180);
      return {
        x: Math.random() * canvas.width * 1.4 - canvas.width * 0.2,
        y: -20 - Math.random() * 120,
        length: Math.random() * 100 + 40,
        speed: Math.random() * 1.5 + 0.4,
        angle: Math.random() > 0.5 ? angle : Math.PI - angle,
        opacity: 0,
        fadeState: "in",
        life: 0,
        maxLife: Math.random() * 300 + 150,
        width: Math.random() * 0.8 + 0.2,
      };
    };

    const createLightning = (): Lightning => {
      const startX = Math.random() * canvas.width;
      const startY = 0;
      const segments: Lightning["segments"] = [];
      let x = startX;
      let y = startY;
      const numSegments = Math.floor(Math.random() * 4) + 3;

      for (let i = 0; i < numSegments; i++) {
        const nextX = x + (Math.random() - 0.5) * 120;
        const nextY = y + Math.random() * 80 + 30;
        segments.push({ x1: x, y1: y, x2: nextX, y2: nextY });
        x = nextX;
        y = nextY;
      }

      return {
        segments,
        opacity: 0.6 + Math.random() * 0.3,
        life: 0,
        maxLife: 8 + Math.floor(Math.random() * 6),
        fadeState: "flash",
      };
    };

    const maxStars = 4;
    const spawnChance = 0.012;
    const lightningChance = 0.0008;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn shooting stars (toned down)
      if (stars.length < maxStars && Math.random() < spawnChance) {
        stars.push(createStar());
      }

      // Spawn lightning (occasional)
      if (lightningFlashes.length < 1 && Math.random() < lightningChance) {
        lightningFlashes.push(createLightning());
      }

      // Draw shooting stars
      stars = stars.filter((star) => {
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.fadeState === "in") {
          star.opacity = Math.min(star.opacity + 0.012, 0.5);
          if (star.opacity >= 0.5) star.fadeState = "visible";
        } else if (star.fadeState === "visible" && star.life > star.maxLife * 0.65) {
          star.fadeState = "out";
        } else if (star.fadeState === "out") {
          star.opacity -= 0.006;
        }

        if (star.opacity <= 0 && star.fadeState === "out") return false;
        if (star.y > canvas.height + 80) return false;

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        // Main trail
        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, `rgba(201, 168, 76, 0)`);
        gradient.addColorStop(0.4, `rgba(201, 168, 76, ${star.opacity * 0.1})`);
        gradient.addColorStop(0.8, `rgba(201, 168, 76, ${star.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(226, 200, 120, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Soft outer glow
        const glowGradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        glowGradient.addColorStop(0, `rgba(201, 168, 76, 0)`);
        glowGradient.addColorStop(0.7, `rgba(201, 168, 76, ${star.opacity * 0.05})`);
        glowGradient.addColorStop(1, `rgba(226, 200, 120, ${star.opacity * 0.15})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = star.width * 3;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 3);
        headGlow.addColorStop(0, `rgba(226, 200, 120, ${star.opacity * 0.7})`);
        headGlow.addColorStop(0.5, `rgba(201, 168, 76, ${star.opacity * 0.2})`);
        headGlow.addColorStop(1, `rgba(201, 168, 76, 0)`);

        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        return true;
      });

      // Draw lightning
      lightningFlashes = lightningFlashes.filter((bolt) => {
        bolt.life++;

        if (bolt.life > bolt.maxLife * 0.3) {
          bolt.fadeState = "out";
          bolt.opacity *= 0.75;
        }

        if (bolt.opacity < 0.02) return false;

        // Brief screen flash
        if (bolt.life <= 2) {
          ctx.fillStyle = `rgba(200, 200, 220, ${bolt.opacity * 0.03})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw bolt segments
        bolt.segments.forEach((seg) => {
          // Outer glow
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = `rgba(180, 180, 220, ${bolt.opacity * 0.15})`;
          ctx.lineWidth = 6;
          ctx.lineCap = "round";
          ctx.stroke();

          // Core bolt
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = `rgba(220, 220, 255, ${bolt.opacity * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Bright center
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity * 0.9})`;
          ctx.lineWidth = 0.5;
          ctx.lineCap = "round";
          ctx.stroke();
        });

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: "screen" }}
    />
  );
}
