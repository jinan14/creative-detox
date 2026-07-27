import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { FiCheck, FiType, FiMessageSquare, FiMaximize2, FiDroplet } from "react-icons/fi";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const sizeOptions = ["Small", "Medium", "Large"];
const colorOptions = ["White", "Ivory", "Gold", "Rose", "Charcoal"];

export default function Gypsum() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    arabicText: "",
    notes: "",
    size: "",
    color: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.arabicText.trim()) e.arabicText = "Arabic name or word is required";
    if (!form.size) e.size = "Please select a size";
    if (!form.color) e.color = "Please select a color";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/gypsum", form);
      setSubmitted(true);
      setForm({ arabicText: "", notes: "", size: "", color: "" });
    } catch (err) {
      setErrors({
        arabicText: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-cream pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-4"
          >
            Custom Gypsum Carvings
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Order a Personalized Piece
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Request a hand-carved gypsum piece featuring your name or a word
            of your choosing in Arabic calligraphy, made to your preferred
            size and color.
          </motion.p>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-white rounded-3xl flex flex-col items-center justify-center text-center p-10 shadow-card"
                >
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-5">
                    <FiCheck size={28} className="text-teal" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-2">
                    Order Received!
                  </h3>
                  <p className="font-body text-sm text-neutral-500 mb-6 max-w-xs">
                    Your custom gypsum request has been saved. Our team will
                    reach out with production details soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary text-sm"
                  >
                    Submit Another Order
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-cream/60 rounded-3xl p-8 shadow-card"
            >
              <div>
                <div className="relative">
                  <FiType size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input
                    name="arabicText"
                    value={form.arabicText}
                    onChange={handleChange}
                    placeholder="Arabic Name or Word"
                    dir="rtl"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.arabicText && (
                  <p className="mt-1 text-xs text-berry font-body">{errors.arabicText}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <FiMaximize2 size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                    <select
                      name="size"
                      value={form.size}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    >
                      <option value="">Select Size</option>
                      {sizeOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.size && <p className="mt-1 text-xs text-berry font-body">{errors.size}</p>}
                </div>

                <div>
                  <div className="relative">
                    <FiDroplet size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                    <select
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    >
                      <option value="">Select Color</option>
                      {colorOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.color && <p className="mt-1 text-xs text-berry font-body">{errors.color}</p>}
                </div>
              </div>

              <div className="relative">
                <FiMessageSquare size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any notes or special requests? (optional)"
                  rows={4}
                  className={`${inputClass} pl-10 resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary justify-center py-4 text-sm mt-1 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : user ? "Submit Order" : "Log In to Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
