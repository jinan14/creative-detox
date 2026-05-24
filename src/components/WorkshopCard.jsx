import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const categoryColors = {
  Painting: "bg-teal/10 text-teal",
  Collage: "bg-berry/10 text-berry",
  Carving: "bg-sage/10 text-sage-dark",
  Kids: "bg-rose-muted/20 text-rose-muted",
  Mindfulness: "bg-teal/10 text-teal-dark",
};

export default function WorkshopCard({ workshop, index = 0, ...props }) {
  const {
    title,
    description,
    category,
    duration = "2 Hours",
    difficulty,
    level,
    date = "Coming Soon",
    image,
    spots,
  } = workshop ?? props;

  const displayDifficulty = difficulty ?? level ?? "All Levels";
  const spotsLeft = Number(spots);
  const hasLimitedSpots = Number.isFinite(spotsLeft) && spotsLeft <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-base group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-3 left-3 text-xs font-body font-medium px-3 py-1 rounded-full ${categoryColors[category] || "bg-neutral-100 text-neutral-600"} backdrop-blur-sm`}>
          {category}
        </span>
        {hasLimitedSpots && (
          <span className="absolute top-3 right-3 text-xs font-body font-medium px-3 py-1 rounded-full bg-berry/90 text-white backdrop-blur-sm">
            {spotsLeft} spots left
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-semibold text-xl text-neutral-900 mb-2 group-hover:text-teal transition-colors">
          {title}
        </h3>
        <p className="font-body text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-5 mt-auto">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <FiClock size={13} />
            <span className="font-body text-xs">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <FiCalendar size={13} />
            <span className="font-body text-xs">{date}</span>
          </div>
          <span className="ml-auto text-xs font-body text-sage-dark bg-sage/10 px-2.5 py-1 rounded-full">
            {displayDifficulty}
          </span>
        </div>

        <Link
          to="/workshops"
          className="flex items-center justify-between w-full px-4 py-3 bg-cream rounded-2xl text-teal font-body font-medium text-sm group/btn hover:bg-berry hover:text-white transition-all duration-300"
        >
          <span>Learn More</span>
          <FiArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
