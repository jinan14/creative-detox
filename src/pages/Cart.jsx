import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, loading, total, removeItem, checkout } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handleRemove = async (artworkId) => {
    setRemovingId(artworkId);
    try {
      await removeItem(artworkId);
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await checkout();
      setPlaced(true);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
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
            Review Your Selection
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
                      src={item.image}
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

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="btn-primary justify-center w-full py-4 text-sm mt-6 disabled:opacity-60"
              >
                {checkingOut ? "Placing Order..." : "Checkout"}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {placed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-card"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center">
                <FiCheck size={26} className="text-sage-dark" />
              </div>
              <h2 className="font-display text-2xl font-bold text-teal mb-2">Order Placed!</h2>
              <p className="font-body text-sm text-neutral-500 mb-6">
                Thank you for your purchase. Your cart has been cleared.
              </p>
              <Link
                to="/gallery"
                onClick={() => setPlaced(false)}
                className="btn-primary justify-center w-full py-3 text-sm"
              >
                Continue Browsing
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
