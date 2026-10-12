import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

// Each note gets its own tilt and tape colour so the wall feels hand-pinned.
const looks = [
  { rotate: -3, tape: "bg-berry/40", ring: "from-berry to-rose-muted" },
  { rotate: 2, tape: "bg-teal/35", ring: "from-teal to-teal-light" },
  { rotate: -1.5, tape: "bg-sage/50", ring: "from-sage to-sage-light" },
];

export default function TestimonialCard({ name, role, image, review, index = 0 }) {
  const look = looks[index % looks.length];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 60, rotate: look.rotate * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: look.rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -10, scale: 1.02 }}
      className="relative bg-white rounded-sm p-8 pt-10 shadow-card"
    >
      {/* Washi tape */}
      <span
        aria-hidden
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 ${look.tape} backdrop-blur-sm rotate-[-4deg] shadow-sm`}
      />

      {/* Oversized quote mark */}
      <span
        aria-hidden
        className="absolute top-2 right-5 font-display text-8xl leading-none text-berry/15 select-none"
      >
        ”
      </span>

      <div className="flex items-center gap-1 text-amber-400 mb-5">
        {[...Array(5)].map((_, i) => (
          <HiStar key={i} size={18} />
        ))}
      </div>

      <blockquote className="relative font-display italic text-lg text-neutral-700 leading-relaxed mb-8">
        “{review}”
      </blockquote>

      <figcaption className="flex items-center gap-4">
        <span className={`p-[3px] rounded-full bg-gradient-to-br ${look.ring}`}>
          <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-white" />
        </span>
        <span>
          <span className="block font-hand text-3xl leading-none text-teal">{name}</span>
          <span className="block text-sm text-neutral-500 mt-1">{role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
