import { useEffect, useRef } from "react";

// Brand pigments the brush cycles through as it travels.
const PALETTE = [
  [29, 106, 138], // teal
  [184, 92, 122], // berry
  [138, 168, 137], // sage
  [232, 165, 184], // rose
];

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(lerp(v, c2[i], t)));

/**
 * Full-bleed canvas the visitor paints on with their pointer. Strokes are made
 * of many soft radial dabs (watercolor look) and slowly dissolve. When nobody
 * is painting (e.g. on phones), a "ghost brush" wanders and paints by itself.
 * `targetRef` is the element whose pointer movement drives the brush.
 */
export default function PaintCanvas({ targetRef, reduceMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const target = targetRef.current;
    if (!canvas || !target) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let hue = 0; // position along PALETTE, advances with distance painted
    let last = null;
    let lastUserInput = 0;
    let frame = 0;

    const colorAt = (h) => {
      const i = Math.floor(h) % PALETTE.length;
      return mix(PALETTE[i], PALETTE[(i + 1) % PALETTE.length], h - Math.floor(h));
    };

    const dab = (x, y, radius, alpha) => {
      const [r, g, b] = colorAt(hue);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.6, `rgba(${r},${g},${b},${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const strokeTo = (x, y) => {
      if (!last) {
        last = { x, y };
        return;
      }
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;
      // Faster movement = thinner, lighter stroke, like a real brush.
      const radius = Math.max(24, 64 - dist * 0.4);
      const steps = Math.ceil(dist / 4);
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const jitter = (Math.random() - 0.5) * radius * 0.3;
        dab(last.x + dx * t + jitter, last.y + dy * t + jitter, radius * (0.8 + Math.random() * 0.4), 0.13);
      }
      hue += dist / 600;
      last = { x, y };
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse" && e.buttons === 0) return;
      const rect = canvas.getBoundingClientRect();
      lastUserInput = performance.now();
      strokeTo(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onPointerLeave = () => {
      last = null;
    };
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerleave", onPointerLeave);

    // Ghost brush: a wandering Lissajous path that paints while the visitor is idle.
    let ghostT = Math.random() * 100;
    let ghostLast = null;
    const ghostStep = () => {
      ghostT += 0.006;
      const x = width * (0.5 + 0.42 * Math.sin(ghostT * 1.3) * Math.cos(ghostT * 0.4));
      const y = height * (0.5 + 0.38 * Math.sin(ghostT * 0.9 + 1));
      const saved = last;
      last = ghostLast;
      strokeTo(x, y);
      ghostLast = last;
      last = saved;
    };

    if (reduceMotion) {
      // One still composition instead of animation.
      for (let i = 0; i < 260; i++) ghostStep();
      return () => {
        window.removeEventListener("resize", resize);
        target.removeEventListener("pointermove", onPointerMove);
        target.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    const loop = () => {
      // Slowly dissolve old paint.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.01)";
      ctx.fillRect(0, 0, width, height);

      if (performance.now() - lastUserInput > 2500) ghostStep();
      else ghostLast = null;

      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [targetRef, reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full" />;
}
