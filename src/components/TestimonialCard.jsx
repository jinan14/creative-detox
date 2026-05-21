import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

export default function TestimonialCard({
  name,
  role,
  image,
  review,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-7 shadow-soft border border-neutral-100"
    >
      {/* Stars */}
      <div className="flex items-center gap-1 text-amber-400 mb-5">
        {[...Array(5)].map((_, index) => (
          <HiStar key={index} size={20} />
        ))}
      </div>

      {/* Review */}
      <p className="text-neutral-600 leading-relaxed mb-7">
        "{review}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />

        {/* Text */}
        <div>
          <h4 className="font-semibold text-lg text-neutral-800">
            {name}
          </h4>

          <p className="text-sm text-neutral-500">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}