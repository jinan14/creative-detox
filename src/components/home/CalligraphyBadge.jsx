import { motion, useReducedMotion } from "framer-motion";

// Arabic "إبداع" (creativity) that writes itself: the outline is traced first,
// then the ink fills in.
export default function CalligraphyBadge({ className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -4 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className={`bg-white/95 backdrop-blur rounded-2xl shadow-card px-6 pt-2 pb-3 text-center ${className}`}
    >
      <svg viewBox="0 0 260 120" className="w-48 md:w-56 h-auto" role="img" aria-label="إبداع — creativity">
        <motion.text
          x="130"
          y="84"
          textAnchor="middle"
          direction="rtl"
          fontFamily="var(--font-arabic)"
          fontSize="86"
          fontWeight="700"
          stroke="var(--color-berry)"
          strokeWidth="1.6"
          strokeDasharray="900"
          initial={
            reduceMotion
              ? { strokeDashoffset: 0, fill: "rgba(184,92,122,1)" }
              : { strokeDashoffset: 900, fill: "rgba(184,92,122,0)" }
          }
          whileInView={{ strokeDashoffset: 0, fill: "rgba(184,92,122,1)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            strokeDashoffset: { duration: 2.4, ease: "easeInOut", delay: 0.3 },
            fill: { duration: 0.8, delay: 2.2 },
          }}
        >
          إبداع
        </motion.text>
      </svg>
      <p className="font-hand text-xl text-neutral-500 -mt-2">ibdaa — “creativity”</p>
    </motion.div>
  );
}
