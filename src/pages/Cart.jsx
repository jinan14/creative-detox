import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { resolveThumbnailUrl, fallbackToFullImage } from "../utils/resolveImageUrl";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";

export default function Cart() {
  const { items, loading, total, removeItem } = useCart();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (artworkId) => {
    setRemovingId(artworkId);
    try {
      await removeItem(artworkId);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden bg-cream pt-36 pb-24 min-h-screen">
        <WatercolorBackground intensity={0.25} />
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-3 text-center"
          >
            Your Cart
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-teal mb-10 text-center"
          >
            Review Your <BrushUnderline>Selection</BrushUnderline>
          </motion.h1>

          {loading && (
            <p className="text-center text-neutral-500 font-body">Loading your cart...</p>
          )}

          {!loading && items.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-12 shadow-card text-center flex flex-col items-center gap-4"
            >
              <FiShoppingBag size={32} className="text-neutral-300" />
              <p className="text-neutral-500 font-body">Your cart is empty.</p>
              <Link to="/gallery" className="btn-primary text-sm py-2.5 px-5">
                Browse the Gallery
              </Link>
            </motion.div>
          )}

          {!loading && items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-card"
            >
              <div className="flex flex-col divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <img
                      src={resolveThumbnailUrl(item.image)}
                      onError={fallbackToFullImage(item.image)}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-neutral-900 truncate">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-neutral-400">by {item.artist}</p>
                    </div>
                    <span className="font-display font-semibold text-teal whitespace-nowrap">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleRemove(item._id)}
                      disabled={removingId === item._id}
                      className="text-neutral-400 hover:text-berry transition-colors p-2 disabled:opacity-50"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-100">
                <span className="font-body text-neutral-600">Total</span>
                <span className="font-display text-2xl font-bold text-teal">${total}</span>
              </div>

              <Link
                to="/checkout"
                className="btn-primary justify-center w-full py-4 text-sm mt-6"
              >
                Checkout
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
