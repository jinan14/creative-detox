import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const timeline = [
  { year: "2024", title: "The Idea Was Born", text: "A vision to combine art with emotional wellness.", color: "var(--color-teal)" },
  { year: "2025", title: "First Community Workshop", text: "Our first collage and mindful painting sessions.", color: "var(--color-berry)" },
  { year: "2025", title: "A Growing Community", text: "More people joined our workshops and creative events.", color: "var(--color-sage)" },
  { year: "Today", title: "Creative Detox Today", text: "An artistic wellness platform built on creativity and connection.", color: "var(--color-rose-muted)" },
];

const BRUSH_PATH = "M30 0 C 44 80, 16 170, 30 250 S 44 420, 30 500 S 16 670, 30 750 S 44 920, 30 1000";

// A brush line that paints itself down the page as you scroll, with each
// milestone pinned beside it.
export default function JourneyTimeline() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className="relative">
      <svg
        aria-hidden
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        className="absolute top-0 h-full w-16 left-6 md:left-1/2 -translate-x-1/2"
      >
        <path d={BRUSH_PATH} fill="none" stroke="var(--color-teal-light)" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={BRUSH_PATH}
          fill="none"
          stroke="var(--color-berry)"
          strokeOpacity="0.7"
          strokeWidth="7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduceMotion ? 1 : progress }}
        />
      </svg>

      <div className="flex flex-col gap-14 md:gap-20 py-4">
        {timeline.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <div key={item.title} className="relative md:grid md:grid-cols-2">
              {/* Paint drop on the line */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                className="absolute top-7 left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ring-4 ring-white shadow-soft z-10"
                style={{ background: item.color }}
              />

              <motion.div
                initial={{ opacity: 0, x: right ? 50 : -50, rotate: right ? 4 : -4 }}
                whileInView={{ opacity: 1, x: 0, rotate: right ? 1.5 : -1.5 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: 0, y: -6 }}
                className={`ml-16 md:ml-0 ${right ? "md:col-start-2 md:ml-16" : "md:mr-16 md:text-right"}`}
              >
                <div className="relative bg-cream rounded-2xl p-6 shadow-soft">
                  <span
                    aria-hidden
                    className={`absolute -top-3 w-20 h-6 rotate-[-4deg] opacity-50 ${right ? "left-6" : "left-6 md:left-auto md:right-6"}`}
                    style={{ background: item.color }}
                  />
                  <p className="font-hand text-4xl leading-none mb-2" style={{ color: item.color }}>
                    {item.year}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
