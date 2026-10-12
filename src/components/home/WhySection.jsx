import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineUsers,
  HiOutlineLightBulb,
} from "react-icons/hi";
import BrushUnderline from "./BrushUnderline";

const features = [
  {
    icon: HiOutlineHeart,
    title: "Stress Relief",
    text: "Art helps you relax, recharge, and disconnect from daily stress.",
    color: "var(--color-teal)",
    hover: { title: "group-hover:text-white", text: "group-hover:text-white/90", icon: "group-hover:!text-white" },
    tilt: -2,
  },
  {
    icon: HiOutlineSparkles,
    title: "Self Expression",
    text: "Explore your thoughts and emotions through creativity.",
    color: "var(--color-berry)",
    hover: { title: "group-hover:text-white", text: "group-hover:text-white/90", icon: "group-hover:!text-white" },
    tilt: 1.5,
  },
  {
    icon: HiOutlineUsers,
    title: "Community",
    text: "Connect with inspiring people in a welcoming creative space.",
    color: "var(--color-sage)",
    hover: { title: "group-hover:text-neutral-900", text: "group-hover:text-neutral-800", icon: "group-hover:!text-neutral-900" },
    tilt: -1,
  },
  {
    icon: HiOutlineLightBulb,
    title: "Creative Exploration",
    text: "Experiment with different art styles and discover new passions.",
    color: "var(--color-rose-muted)",
    hover: { title: "group-hover:text-neutral-900", text: "group-hover:text-neutral-800", icon: "group-hover:!text-neutral-900" },
    tilt: 2,
  },
];

// Organic blob shapes the icon sits on; they morph between each other.
const blobPaths = [
  "M42,-55C54,-45,63,-31,67,-15C71,1,70,18,62,32C54,46,39,57,22,63C5,69,-14,70,-30,63C-46,56,-59,41,-65,24C-71,7,-70,-12,-62,-27C-54,-42,-39,-53,-23,-61C-7,-69,10,-74,24,-70C38,-66,30,-65,42,-55Z",
  "M37,-50C49,-40,60,-28,66,-12C72,4,73,22,64,35C55,48,36,57,17,63C-2,69,-21,72,-37,64C-53,56,-65,37,-69,18C-73,-1,-69,-20,-58,-34C-47,-48,-29,-57,-12,-62C5,-67,25,-60,37,-50Z",
];

function FeatureCard({ feature, index, reduceMotion }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: feature.tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: feature.tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -8 }}
      className="group relative overflow-hidden bg-white rounded-[2rem] p-8 pt-10 shadow-soft"
    >
      {/* Paint that pours up from the bottom on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[115%] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ color: feature.color }}
      >
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute -top-[38px] left-0 w-full h-10">
          <path
            d="M0 40 V22 C 40 6, 80 34, 130 20 S 220 2, 270 18 S 360 34, 400 14 V40 Z"
            fill="currentColor"
          />
        </svg>
        <div className="w-full h-full" style={{ background: feature.color }} />
      </div>

      {/* Outlined number */}
      <span
        aria-hidden
        className="absolute top-5 right-6 font-display font-bold text-6xl text-transparent transition-opacity duration-500 group-hover:opacity-40"
        style={{ WebkitTextStroke: `1.5px ${feature.color}` }}
      >
        0{index + 1}
      </span>

      <div className="relative">
        <div className="relative w-20 h-20 mb-7 flex items-center justify-center">
          <svg viewBox="-80 -80 160 160" className="absolute inset-0 w-full h-full" aria-hidden>
            <motion.path
              fill={feature.color}
              className="opacity-20 group-hover:opacity-30 transition-opacity"
              initial={{ d: blobPaths[0] }}
              animate={reduceMotion ? undefined : { d: [blobPaths[0], blobPaths[1], blobPaths[0]] }}
              transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <Icon
            size={32}
            className={`relative transition-colors duration-500 ${feature.hover.icon}`}
            style={{ color: feature.color }}
          />
        </div>

        <h3 className={`font-display text-2xl font-semibold text-neutral-800 mb-3 transition-colors duration-500 ${feature.hover.title}`}>
          {feature.title}
        </h3>
        <p className={`text-neutral-600 leading-relaxed transition-colors duration-500 ${feature.hover.text}`}>
          {feature.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 bg-cream overflow-hidden">
      {/* Big loose brush sweeps behind the cards */}
      <svg
        aria-hidden
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute left-0 top-1/2 -translate-y-1/3 w-full h-[70%] pointer-events-none"
      >
        <motion.path
          d="M-20 260 C 200 140, 380 330, 620 220 S 1000 90, 1220 200"
          fill="none"
          stroke="var(--color-teal-light)"
          strokeWidth="90"
          strokeLinecap="round"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M-20 330 C 260 380, 520 250, 760 320 S 1080 380, 1220 300"
          fill="none"
          stroke="var(--color-rose-muted)"
          strokeWidth="50"
          strokeLinecap="round"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 paper-grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-berry font-medium mb-3">Why Creative Detox</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
            More Than Just <BrushUnderline>Art</BrushUnderline>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Our workshops are designed to nurture creativity, mindfulness, and emotional
            wellness in a welcoming environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
