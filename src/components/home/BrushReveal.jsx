import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Ragged right edge, so the wipe looks like a wide brush dragged across the image.
const jitter = [0, 6, -4, 8, -2, 5, -6, 3, 7, -3, 0];

const brushEdge = (x) => {
  const edge = jitter
    .map((j, i) => `${x + j}% ${(i / (jitter.length - 1)) * 100}%`)
    .join(", ");
  return `polygon(0% 0%, ${edge}, 0% 100%)`;
};

export default function BrushReveal({ children, className = "", delay = 0 }) {
  // Observe the unclipped wrapper: a fully clipped element never counts as "in view".
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: brushEdge(-10) }}
        animate={{ clipPath: brushEdge(inView ? 115 : -10) }}
        transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
