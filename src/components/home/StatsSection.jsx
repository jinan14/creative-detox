import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import WatercolorBackground from "./WatercolorBackground";
import BrushUnderline from "./BrushUnderline";

const stats = [
  { value: 20, label: "Workshops", note: "and counting", color: "var(--color-teal)", blob: "M44,-58C57,-49,67,-35,71,-19C75,-3,73,14,65,29C57,44,43,57,27,64C11,71,-8,72,-26,66C-44,60,-61,47,-69,30C-77,13,-76,-8,-68,-26C-60,-44,-45,-59,-29,-67C-13,-75,5,-76,20,-71C35,-66,31,-67,44,-58Z" },
  { value: 100, label: "Participants", note: "creative souls", color: "var(--color-berry)", blob: "M39,-51C51,-43,62,-31,67,-16C72,-1,71,16,63,30C55,44,40,55,23,62C6,69,-13,72,-30,66C-47,60,-62,45,-68,28C-74,11,-71,-8,-63,-24C-55,-40,-42,-53,-27,-61C-12,-69,5,-72,19,-67C33,-62,27,-59,39,-51Z" },
  { value: 15, label: "Private Art Sessions", note: "made just for you", color: "var(--color-sage)", blob: "M47,-60C60,-50,68,-34,70,-18C72,-2,68,14,60,28C52,42,40,54,25,61C10,68,-8,70,-25,64C-42,58,-58,44,-66,27C-74,10,-74,-10,-66,-26C-58,-42,-42,-54,-26,-63C-10,-72,6,-78,21,-75C36,-72,34,-70,47,-60Z" },
];

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return <span ref={ref}>{display}+</span>;
}

export default function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 bg-cream overflow-hidden">
      <WatercolorBackground intensity={0.22} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-berry font-medium mb-3">Our Story So Far</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-teal">
            Painted in <BrushUnderline>Numbers</BrushUnderline>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center"
            >
              {/* Painted blob behind the number */}
              <motion.svg
                aria-hidden
                viewBox="-80 -80 160 160"
                className="absolute -top-10 w-60 h-60 md:w-64 md:h-64"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 40 + i * 8, repeat: Infinity, ease: "linear" }}
              >
                <path d={stat.blob} fill={stat.color} opacity="0.16" />
                <path d={stat.blob} fill="none" stroke={stat.color} strokeWidth="1.2" opacity="0.35" transform="scale(0.86) rotate(25)" />
              </motion.svg>

              <span
                className="relative font-display font-bold text-6xl md:text-7xl mt-6"
                style={{ color: stat.color }}
              >
                <CountUp value={stat.value} />
              </span>
              <span className="relative font-display text-xl md:text-2xl text-neutral-800 font-semibold mt-3">
                {stat.label}
              </span>
              <span className="relative font-hand text-xl text-neutral-500 mt-1">{stat.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
