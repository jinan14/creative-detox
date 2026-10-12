import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GOLD_DARK = "#9a7432";

/**
 * A miniature gypsum plaque: the Arabic word "نحت" (carving) traces itself,
 * fills with gold leaf, looks pressed into the plaster, then catches the light.
 */
export default function CarvingBadge({ className = "" }) {
  const reduceMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const ids = { gold: `gold-${id}`, carve: `carve-${id}`, clip: `clip-${id}`, shine: `shine-${id}` };
  const inView = { once: true, amount: 0.6 };

  const word = (props) => (
    <text
      x="150"
      y="112"
      textAnchor="middle"
      direction="rtl"
      fontFamily="var(--font-arabic)"
      fontSize="104"
      fontWeight="700"
      {...props}
    >
      نحت
    </text>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: -4, scale: 1 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      className={className || "relative"}
    >
      {/* The plaque */}
      <div className="relative rounded-xl p-2.5 shadow-card bg-[linear-gradient(145deg,#fbf8f2,#efe8dc)]">
        <div className="absolute inset-0 rounded-xl paper-grain pointer-events-none" />
        <div className="relative rounded-lg border-2 p-1" style={{ borderColor: GOLD_DARK }}>
          <div className="relative rounded-md border px-5 pt-1 pb-2" style={{ borderColor: `${GOLD_DARK}88` }}>
            {/* Corner ornaments */}
            {["top-0.5 left-1", "top-0.5 right-1", "bottom-0.5 left-1", "bottom-0.5 right-1"].map((pos) => (
              <span key={pos} aria-hidden className={`absolute ${pos} text-[10px]`} style={{ color: GOLD_DARK }}>
                ✦
              </span>
            ))}

            <svg viewBox="0 0 300 150" className="w-52 md:w-60 h-auto" role="img" aria-label="نحت — carving">
              <defs>
                <linearGradient id={ids.gold} x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor="#f6e1a1" />
                  <stop offset="45%" stopColor="#d4ab55" />
                  <stop offset="100%" stopColor="#8f6a28" />
                </linearGradient>
                {/* Inner shadow top-left + highlight bottom-right = engraved look */}
                <filter id={ids.carve} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="-1.2" dy="-1.2" stdDeviation="0.6" floodColor="#5c4318" floodOpacity="0.55" />
                  <feDropShadow dx="1.2" dy="1.5" stdDeviation="0.5" floodColor="#ffffff" floodOpacity="0.9" />
                </filter>
                <clipPath id={ids.clip}>{word({})}</clipPath>
                <linearGradient id={ids.shine} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#fff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gold fill, carved */}
              <motion.g
                filter={`url(#${ids.carve})`}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.9, delay: 2.1 }}
              >
                {word({ fill: `url(#${ids.gold})` })}
              </motion.g>

              {/* Outline that writes itself first */}
              <motion.g
                initial={{ strokeDashoffset: reduceMotion ? 0 : 700 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={inView}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                fill="none"
                stroke={GOLD_DARK}
                strokeWidth="1.4"
                strokeDasharray="700"
              >
                {word({})}
              </motion.g>

              {/* Light sweeping across the gold */}
              {!reduceMotion && (
                <g clipPath={`url(#${ids.clip})`}>
                  <motion.rect
                    y="0"
                    width="70"
                    height="150"
                    fill={`url(#${ids.shine})`}
                    initial={{ x: -90 }}
                    whileInView={{ x: [-90, 320] }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 1.4, delay: 3, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Ribbon label */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ delay: 2.6 }}
        className="absolute -bottom-4 right-4 rotate-3 bg-berry text-white font-hand text-xl px-4 py-0.5 rounded-sm shadow-soft [clip-path:polygon(0_0,100%_0,94%_50%,100%_100%,0_100%,6%_50%)]"
      >
        naht — “carving”
      </motion.span>
    </motion.div>
  );
}
