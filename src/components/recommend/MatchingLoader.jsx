import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const steps = [
  { text: "Reading how you feel…", emoji: "💭" },
  { text: "Mixing the right colours…", emoji: "🎨" },
  { text: "Browsing our workshops…", emoji: "🖼️" },
  { text: "Matching them to your mood…", emoji: "✨" },
  { text: "Adding the finishing brushstrokes…", emoji: "🖌️" },
];

const drops = ["var(--color-teal)", "var(--color-berry)", "var(--color-sage)", "var(--color-rose-muted)"];

/**
 * Shown while the AI picks workshops. We can't know the real progress of the
 * OpenAI call, so the bar eases toward 90% and only jumps to 100% when the
 * parent sets `done` — it never claims to be finished early.
 */
export default function MatchingLoader({ done, onFinished }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(4);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (done) return;
    const tick = setInterval(() => setProgress((p) => p + (90 - p) * 0.025), 120);
    const words = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 2200);
    return () => {
      clearInterval(tick);
      clearInterval(words);
    };
  }, [done]);

  const shown = done ? 100 : progress;

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onFinished, 450);
    return () => clearTimeout(t);
  }, [done, onFinished]);

  return (
    <div className="max-w-3xl mx-auto px-6" role="status" aria-live="polite">
      <div className="relative bg-cream rounded-[2rem] shadow-card p-8 md:p-10 overflow-hidden text-center">
        <div className="absolute inset-0 paper-grain pointer-events-none" />

        {/* Palette with bouncing paint drops */}
        <div className="relative flex justify-center gap-3 mb-6 h-10 items-end">
          {drops.map((color, i) => (
            <motion.span
              key={color}
              className="w-5 h-5 rounded-full shadow-soft"
              style={{ background: color }}
              animate={reduceMotion ? undefined : { y: [0, -16, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative h-8 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={done ? "done" : step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-hand text-2xl md:text-3xl text-teal"
            >
              {done ? "🌿 Your matches are ready!" : `${steps[step].emoji} ${steps[step].text}`}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Brush-stroke progress bar */}
        <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="relative w-full h-6" aria-hidden>
          <path
            d="M8 16 C 80 6, 150 24, 220 14 S 340 8, 392 15"
            fill="none"
            stroke="var(--color-teal-light)"
            strokeOpacity="0.35"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <motion.path
            d="M8 16 C 80 6, 150 24, 220 14 S 340 8, 392 15"
            fill="none"
            stroke="url(#brush-progress)"
            strokeWidth="14"
            strokeLinecap="round"
            animate={{ pathLength: shown / 100 }}
            transition={{ duration: done ? 0.4 : 0.15, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="brush-progress" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-teal)" />
              <stop offset="60%" stopColor="var(--color-berry)" />
              <stop offset="100%" stopColor="var(--color-rose-muted)" />
            </linearGradient>
          </defs>
        </svg>
        <p className="relative font-body text-xs text-neutral-400 mt-2">{Math.round(shown)}%</p>
      </div>

      {/* Placeholder cards so the results area doesn't pop in from nothing */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`bg-white rounded-3xl shadow-soft overflow-hidden ${i > 0 ? "hidden md:block" : ""}`}
          >
            <div className="h-40 bg-cream animate-pulse" />
            <div className="p-5 flex flex-col gap-2.5">
              <div className="h-4 w-2/3 rounded-full bg-cream animate-pulse" />
              <div className="h-3 w-full rounded-full bg-cream/70 animate-pulse" />
              <div className="h-3 w-4/5 rounded-full bg-cream/70 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
