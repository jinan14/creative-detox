import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CustomerInfoForm from "../components/CustomerInfoForm";
import { emptyCustomer, validateCustomer } from "../utils/customerInfo";
import { buildWhatsAppUrl, buildArtworkOrderMessage, orderReference } from "../utils/whatsapp";
import { resolveThumbnailUrl, fallbackToFullImage } from "../utils/resolveImageUrl";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";

export default function Checkout() {
  const { user } = useAuth();
  const { items, loading, total, placeOrder } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(() => emptyCustomer(user));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (name, value) => {
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateCustomer(customer);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const order = await placeOrder(customer);
      const reference = orderReference("CD", order._id);
      const message = buildArtworkOrderMessage({
        reference,
        items: order.items,
        total: order.total,
        customer,
      });
      navigate("/order-placed", {
        replace: true,
        state: {
          kind: "artwork",
          reference,
          total: order.total,
          paymentMethod: customer.paymentMethod,
          whatsappUrl: buildWhatsAppUrl(message),
        },
      });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  // Stay on the form while submitting, so the cart emptying doesn't flash the empty state.
  const showEmpty = !loading && items.length === 0 && !submitting;

  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden bg-cream pt-36 pb-24 min-h-screen">
        <WatercolorBackground intensity={0.25} />
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-3 text-center"
          >
            Checkout
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-teal mb-10 text-center"
          >
            Delivery <BrushUnderline>Details</BrushUnderline>
          </motion.h1>

          {loading && (
            <p className="text-center text-neutral-500 font-body">Loading your cart...</p>
          )}

          {showEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto bg-white rounded-3xl p-12 shadow-card text-center flex flex-col items-center gap-4"
            >
              <FiShoppingBag size={32} className="text-neutral-300" />
              <p className="text-neutral-500 font-body">Your cart is empty.</p>
              <Link to="/gallery" className="btn-primary text-sm py-2.5 px-5">
                Browse the Gallery
              </Link>
            </motion.div>
          )}

          {!loading && !showEmpty && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-8 shadow-card flex flex-col gap-4"
                noValidate
              >
                <h2 className="font-display text-xl font-semibold text-neutral-900">
                  Your Information
                </h2>

                <CustomerInfoForm value={customer} errors={errors} onChange={handleChange} />

                {submitError && <p className="text-sm text-berry font-body">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary justify-center w-full py-4 text-sm mt-2 disabled:opacity-60"
                >
                  {submitting ? "Placing Order..." : "Complete Order"}
                </button>
                <p className="font-body text-xs text-neutral-400 text-center">
                  You'll be taken to WhatsApp to send us your order details.
                </p>
              </motion.form>

              <motion.aside
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-card"
              >
                <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                  Order Summary
                </h2>
                <div className="flex flex-col divide-y divide-neutral-100">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 py-3 first:pt-0">
                      <img
                        src={resolveThumbnailUrl(item.image)}
                        onError={fallbackToFullImage(item.image)}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-sm text-neutral-900 truncate">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs text-neutral-400">by {item.artist}</p>
                      </div>
                      <span className="font-display font-semibold text-sm text-teal whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                  <span className="font-body text-neutral-600">Total</span>
                  <span className="font-display text-2xl font-bold text-teal">${total}</span>
                </div>
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-1.5 text-sm font-body text-teal hover:text-berry transition-colors mt-4"
                >
                  <FiArrowLeft size={13} /> Back to cart
                </Link>
              </motion.aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
