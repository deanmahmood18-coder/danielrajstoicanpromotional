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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (): Star => {
      const angle = (Math.random() * 40 + 20) * (Math.PI / 180);
      return {
        x: Math.random() * canvas.width * 1.3 - canvas.width * 0.15,
        y: -10 - Math.random() * 80,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 2.5 + 1,
        angle: Math.random() > 0.5 ? angle : Math.PI - angle,
        opacity: 0,
        fadeState: "in",
        life: 0,
        maxLife: Math.random() * 180 + 80,
        width: Math.random() * 1.0 + 0.4,
      };
    };

    const maxStars = 4;
    const spawnChance = 0.012;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (stars.length < maxStars && Math.random() < spawnChance) {
        stars.push(createStar());
      }

      stars = stars.filter((star) => {
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.fadeState === "in") {
          star.opacity = Math.min(star.opacity + 0.02, 0.6);
          if (star.opacity >= 0.6) star.fadeState = "visible";
        } else if (star.fadeState === "visible" && star.life > star.maxLife * 0.6) {
          star.fadeState = "out";
        } else if (star.fadeState === "out") {
          star.opacity -= 0.012;
        }

        if (star.opacity <= 0 && star.fadeState === "out") return false;
        if (star.y > canvas.height + 50) return false;

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, `rgba(201, 168, 76, 0)`);
        gradient.addColorStop(0.5, `rgba(201, 168, 76, ${star.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(226, 200, 120, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glow at the head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 200, 120, ${star.opacity * 0.8})`;
        ctx.fill();

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
