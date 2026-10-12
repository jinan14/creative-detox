import { motion, useReducedMotion } from "framer-motion";

const values = [
  { title: "Creativity", text: "Artistic exploration and creative freedom for everyone.", rgb: "29,106,138" },
  { title: "Wellness", text: "Mindfulness, relaxation, and emotional balance.", rgb: "184,92,122" },
  { title: "Inclusivity", text: "All ages, backgrounds, and skill levels welcome.", rgb: "138,168,137" },
  { title: "Mindfulness", text: "Reconnecting with yourself and the present moment.", rgb: "232,165,184" },
];

// Watercolor pools darker at the edge where the pigment dries.
const wash = (rgb) =>
  `radial-gradient(circle at 45% 40%, rgba(${rgb},0.16) 0%, rgba(${rgb},0.24) 62%, rgba(${rgb},0.5) 93%, rgba(${rgb},0) 100%)`;

const shapes = [
  ["50% 50% 50% 50%", "46% 54% 52% 48% / 53% 46% 54% 47%", "50% 50% 50% 50%"],
  ["50% 50% 50% 50%", "54% 46% 47% 53% / 47% 54% 46% 53%", "50% 50% 50% 50%"],
];

export default function ValuesBlend() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center py-6 lg:py-12">
      {values.map((value, i) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, zIndex: 10 }}
          className={`relative shrink-0 w-[270px] h-[270px] lg:w-[290px] lg:h-[290px] ${
            i > 0 ? "-mt-12 lg:mt-0 lg:-ml-12" : ""
          } ${i % 2 ? "translate-x-10 lg:translate-x-0 lg:translate-y-14" : "-translate-x-10 lg:translate-x-0"}`}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: wash(value.rgb), borderRadius: "50%" }}
            animate={reduceMotion ? undefined : { borderRadius: shapes[i % 2], rotate: [0, 8, 0] }}
            transition={{ duration: 9 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
            <h3 className="font-display text-2xl font-bold text-neutral-800 mb-2">{value.title}</h3>
            <p className="font-body text-sm text-neutral-700 leading-relaxed">{value.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
