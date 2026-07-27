import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const categoryColors = {
  Painting: "bg-teal/10 text-teal",
  Collage: "bg-berry/10 text-berry",
  Carving: "bg-sage/10 text-sage-dark",
  Kids: "bg-rose-muted/20 text-rose-muted",
  Mindfulness: "bg-teal/10 text-teal-dark",
  Vitray: "bg-berry/10 text-berry",
};

export default function ArtworkCard({ artwork, index = 0 }) {
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { _id, title, description, image, artist, price, category, available } = artwork;

  const handleAddToCart = async () => {
    if (!available || added || adding) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      await addItem(_id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft"
    >
      <Link to={`/gallery/${_id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden h-96 bg-cream">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className={`absolute top-3 left-3 text-xs font-body font-medium px-3 py-1 rounded-full ${categoryColors[category] || "bg-neutral-100 text-neutral-600"} backdrop-blur-sm`}>
            {category}
          </span>
          {!available && (
            <span className="absolute top-3 right-3 text-xs font-body font-medium px-3 py-1 rounded-full bg-berry/90 text-white backdrop-blur-sm">
              Sold
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-6 pt-6">
          <h3 className="font-display font-semibold text-xl text-neutral-900 mb-1 group-hover:text-teal transition-colors">
            {title}
          </h3>
          <p className="font-body text-sm text-neutral-400 mb-3">by {artist}</p>
          <p className="font-body text-sm text-neutral-500 leading-relaxed mb-5 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mt-auto gap-4">
          <span className="font-display text-lg font-semibold text-teal">${price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!available || adding}
            className={
              !available
                ? "inline-flex items-center gap-2 rounded-full bg-neutral-100 px-5 py-2.5 font-body text-sm font-semibold text-neutral-400 cursor-not-allowed"
                : added
                ? "inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 font-body text-sm font-semibold text-white"
                : "btn-primary text-sm py-2.5 px-5 disabled:opacity-60"
            }
          >
            {!available ? "Unavailable" : added ? (
              <>
                <FiCheck size={14} /> Added
              </>
            ) : adding ? (
              "Adding..."
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
