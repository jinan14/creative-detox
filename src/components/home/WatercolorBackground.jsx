import { motion, useReducedMotion } from "framer-motion";

// Soft pigment blobs that slowly drift and blend, like wet watercolor on paper.
const blobs = [
  { color: "var(--color-teal)", size: "42vw", top: "-12%", left: "-8%", x: [0, 60, -20, 0], y: [0, 40, 80, 0], duration: 26 },
  { color: "var(--color-berry)", size: "36vw", top: "35%", left: "55%", x: [0, -70, 20, 0], y: [0, -50, 30, 0], duration: 22 },
  { color: "var(--color-sage)", size: "30vw", top: "55%", left: "-5%", x: [0, 50, 90, 0], y: [0, -30, 10, 0], duration: 30 },
  { color: "var(--color-rose-muted)", size: "28vw", top: "-10%", left: "60%", x: [0, -40, -80, 0], y: [0, 60, 20, 0], duration: 24 },
  { color: "var(--color-teal-light)", size: "24vw", top: "60%", left: "75%", x: [0, -30, 10, 0], y: [0, -60, -20, 0], duration: 28 },
];

// `blend="screen"` lets the pigment glow on dark backgrounds (e.g. the footer).
export default function WatercolorBackground({ intensity = 0.35, className = "", blend = "multiply" }) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blend === "screen" ? "mix-blend-screen" : "mix-blend-multiply"}`}
          style={{
            width: blob.size,
            height: blob.size,
            minWidth: 220,
            minHeight: 220,
            top: blob.top,
            left: blob.left,
            opacity: intensity,
            background: `radial-gradient(circle at 40% 40%, ${blob.color}, transparent 68%)`,
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: blob.x, y: blob.y, scale: [1, 1.12, 0.95, 1], borderRadius: ["50%", "42% 58% 55% 45%", "55% 45% 40% 60%", "50%"] }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {blend === "multiply" && <div className="absolute inset-0 paper-grain" />}
    </div>
  );
}
