import { motion } from "framer-motion";

// Wraps a word and paints a brush stroke underneath it when it comes into view.
export default function BrushUnderline({ children, color = "var(--color-berry)", delay = 0.4 }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 30"
        preserveAspectRatio="none"
        className="absolute left-[-4%] bottom-[-0.12em] w-[108%] h-[0.45em] z-0 overflow-visible"
      >
        <motion.path
          d="M6 18 C 60 6, 120 26, 180 14 S 270 8, 294 15"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.55"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
