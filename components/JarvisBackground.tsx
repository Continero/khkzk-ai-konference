"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
}

export function JarvisBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const scrollVelRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pageHRef = useRef(0);

  const initParticles = useCallback((w: number, pageH: number) => {
    const base = w < 768 ? 80 : w < 1200 ? 120 : 180;
    const mult = Math.max(pageH / 4000, 1);
    const count = Math.round(base * mult);
    const p: Particle[] = [];
    for (let i = 0; i < count; i++) {
      p.push({
        x: Math.random() * w,
        y: Math.random() * pageH,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = p;
  }, []);

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = sizeRef.current.w;
    const h = sizeRef.current.h;
    const scroll = scrollRef.current;
    const mouse = mouseRef.current;
    const particles = particlesRef.current;
    const pH = pageHRef.current || h * 8;

    ctx.clearRect(0, 0, w, h);

    // Scroll velocity
    const rawVel = scroll - prevScrollRef.current;
    prevScrollRef.current = scroll;
    scrollVelRef.current += (rawVel - scrollVelRef.current) * 0.12;
    const absVel = Math.abs(scrollVelRef.current);

    const margin = 220;

    // Update particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (absVel > 1) {
        p.vx += (Math.random() - 0.5) * absVel * 0.06;
        p.vy += scrollVelRef.current * 0.002;
      }

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < -margin) p.y = pH;
      if (p.y > pH + margin) p.y = -margin;

      // Mouse
      const sy = p.y - scroll;
      const dx = mouse.x - p.x;
      const dy = mouse.y - sy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const f = (1 - dist / 200) * 0.03;
        p.vx += dx * f * 0.01;
        p.vy += dy * f * 0.01;
      }

      p.vx *= 0.995;
      p.vy *= 0.995;
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 2.5) { p.vx = (p.vx / spd) * 2.5; p.vy = (p.vy / spd) * 2.5; }
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      const ay = a.y - scroll;
      if (ay < -margin || ay > h + margin) continue;

      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const by = b.y - scroll;
        if (by < -margin || by > h + margin) continue;

        const dx = a.x - b.x;
        const dy = ay - by;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const alpha = (1 - dist / 180) * (0.15 + Math.min(absVel * 0.02, 0.15));
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, by);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      const sy = p.y - scroll;
      if (sy < -margin || sy > h + margin) continue;

      const pulse = Math.sin(time * 0.0008 + p.phase) * 0.15 + 0.85;
      const alpha = p.opacity * pulse;

      ctx.beginPath();
      ctx.arc(p.x, sy, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0, 212, 255, 0.3)";
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw grid perspective lines (subtle)
    ctx.strokeStyle = "rgba(0, 212, 255, 0.015)";
    ctx.lineWidth = 0.5;
    const gridSize = 80;
    const offsetY = -(scroll * 0.3) % gridSize;
    for (let y = offsetY; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      sizeRef.current = { w, h };
      pageHRef.current = document.documentElement.scrollHeight;
      if (particlesRef.current.length === 0) {
        initParticles(w, pageHRef.current);
      }
    };

    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    resize();
    onScroll();
    setTimeout(() => { pageHRef.current = document.documentElement.scrollHeight; }, 2000);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "linear-gradient(180deg, #050d0e 0%, #071214 50%, #091518 100%)" }}
    />
  );
}
