import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BrushUnderline from "./BrushUnderline";

const words = ["Creativity", "That", "Heals", "&", "Inspires"];

// Shared by both hero variants: eyebrow, word-by-word headline, copy, buttons.
export default function HeroHeadline({ centered = false }) {
  return (
    <div className={centered ? "text-center flex flex-col items-center" : ""}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-berry font-medium mb-5"
      >
        Art For Your Mental Escape
      </motion.p>

      <h1
        className={`text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-teal mb-6 ${
          centered ? "max-w-4xl" : ""
        }`}
      >
        {words.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word === "Heals" ? <BrushUnderline delay={1}>{word}</BrushUnderline> : word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className={`text-lg text-neutral-600 leading-relaxed max-w-xl mb-8 ${centered ? "mx-auto" : ""}`}
      >
        Creative Detox is a safe artistic space where creativity, mindfulness, and
        self-expression come together through inspiring workshops and community experiences.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className={`flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}
      >
        <Link to="/workshops" className="btn-primary">
          Explore Workshops
        </Link>
        <Link to="/contact" className="btn-secondary">
          Join Now
        </Link>
      </motion.div>
    </div>
  );
}
