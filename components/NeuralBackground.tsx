"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  pulsePhase: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pageHeightRef = useRef(0);
  const themeRef = useRef<"dark" | "light">("dark");

  const CONNECTION_DIST = 200;
  const MOUSE_RADIUS = 250;

  const initParticles = useCallback((w: number, pageH: number) => {
    // Scale particle count with page height — ~1 particle per 8000px² visible area
    const densityBase = w < 768 ? 60 : w < 1200 ? 100 : 140;
    const heightMultiplier = Math.max(pageH / (w < 768 ? 3000 : 4000), 1);
    const count = Math.round(densityBase * heightMultiplier);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * pageH,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 0.8,
        baseOpacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
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
    const pulses = pulsesRef.current;

    // Detect theme
    themeRef.current = document.documentElement.classList.contains("light") ? "light" : "dark";
    const isLight = themeRef.current === "light";

    ctx.clearRect(0, 0, w, h);

    const viewTop = scroll;
    const viewBottom = scroll + h;
    const margin = CONNECTION_DIST;

    // Scroll velocity — smooth it for organic feel
    const rawScrollVel = scroll - prevScrollRef.current;
    prevScrollRef.current = scroll;
    scrollVelocityRef.current += (rawScrollVel - scrollVelocityRef.current) * 0.15;
    const scrollVel = scrollVelocityRef.current;
    const absScrollVel = Math.abs(scrollVel);

    // Update & filter visible particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Scroll disruption — particles scatter when scrolling
      if (absScrollVel > 0.5) {
        // Horizontal scatter proportional to scroll speed
        const scatter = (Math.random() - 0.5) * absScrollVel * 0.08;
        p.vx += scatter;
        // Vertical push — particles drift opposite to scroll direction
        p.vy += scrollVel * 0.003 * (0.5 + Math.random());
      }

      const pH = pageHeightRef.current || h * 10;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < -margin) p.y = pH;
      if (p.y > pH + margin) p.y = -margin;

      // Mouse attraction — stronger
      const screenY = p.y - scroll;
      const dx = mouse.x - p.x;
      const dy = mouse.y - screenY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * 0.04;
        p.vx += dx * force * 0.015;
        p.vy += dy * force * 0.015;
      }

      // Damping — slightly stronger to keep things stable
      p.vx *= 0.994;
      p.vy *= 0.994;

      // Speed cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 3) {
        p.vx = (p.vx / speed) * 3;
        p.vy = (p.vy / speed) * 3;
      }
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

        if (dist < CONNECTION_DIST) {
          const scrollBoost = Math.min(absScrollVel * 0.02, 0.3);
          const alpha = (1 - dist / CONNECTION_DIST) * (0.25 + scrollBoost);
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, by);
          ctx.strokeStyle = isLight ? `rgba(180, 170, 150, ${alpha * 0.35})` : `rgba(0, 168, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const a = particles[pulse.fromIdx];
      const b = particles[pulse.toIdx];
      if (!a || !b) continue;
      const px = a.x + (b.x - a.x) * pulse.progress;
      const py = (a.y - scroll) + ((b.y - scroll) - (a.y - scroll)) * pulse.progress;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(200, 150, 12, ${0.4 * (1 - pulse.progress)})`
        : `rgba(0, 229, 255, ${0.8 * (1 - pulse.progress)})`;
      ctx.shadowBlur = isLight ? 4 : 10;
      ctx.shadowColor = isLight ? "rgba(200, 150, 12, 0.3)" : "#00e5ff";
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Spawn new pulses — more when scrolling
    const pulseChance = absScrollVel > 2 ? 0.15 : 0.04;
    if (Math.random() < pulseChance) {
      const visibleIndices: number[] = [];
      for (let i = 0; i < particles.length; i++) {
        const sy = particles[i].y - scroll;
        if (sy > -margin && sy < h + margin) visibleIndices.push(i);
      }
      if (visibleIndices.length >= 2) {
        const fromIdx = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
        const a = particles[fromIdx];
        // Find a connected particle
        for (const toIdx of visibleIndices) {
          if (toIdx === fromIdx) continue;
          const b = particles[toIdx];
          const dist = Math.sqrt((a.x - b.x) ** 2 + ((a.y - scroll) - (b.y - scroll)) ** 2);
          if (dist < CONNECTION_DIST) {
            const pulseSpeed = absScrollVel > 2 ? 0.03 + Math.random() * 0.03 : 0.015 + Math.random() * 0.02;
            pulses.push({ fromIdx, toIdx, progress: 0, speed: pulseSpeed });
            break;
          }
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      const screenY = p.y - scroll;
      if (screenY < -margin || screenY > h + margin) continue;

      const pulse = Math.sin(time * 0.001 + p.pulsePhase) * 0.2 + 0.8;
      const opacity = p.baseOpacity * pulse;

      // Mouse glow boost
      const dx = mouse.x - p.x;
      const dy = mouse.y - screenY;
      const mouseDist = Math.sqrt(dx * dx + dy * dy);
      const mouseBoost = mouseDist < MOUSE_RADIUS ? (1 - mouseDist / MOUSE_RADIUS) * 0.5 : 0;

      ctx.beginPath();
      ctx.arc(p.x, screenY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(180, 170, 150, ${Math.min((opacity + mouseBoost) * 0.3, 0.35)})`
        : `rgba(0, 168, 255, ${Math.min(opacity + mouseBoost, 1)})`;
      ctx.shadowBlur = isLight ? 2 + mouseBoost * 4 : 8 + mouseBoost * 20;
      ctx.shadowColor = isLight ? "rgba(200, 150, 12, 0.2)" : "#00a8ff";
      ctx.fill();
      ctx.shadowBlur = 0;
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
      pageHeightRef.current = document.documentElement.scrollHeight;

      if (particlesRef.current.length === 0) {
        initParticles(w, pageHeightRef.current);
      }
    };

    // Re-measure page height after content loads (images etc.)
    const updatePageHeight = () => {
      pageHeightRef.current = document.documentElement.scrollHeight;
    };
    setTimeout(updatePageHeight, 2000);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    onScroll();

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
      className="fixed inset-0 z-0 pointer-events-none neural-bg"
    />
  );
}
