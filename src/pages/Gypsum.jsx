import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { FiType, FiMessageSquare, FiMaximize2, FiDroplet, FiX, FiArrowLeft } from "react-icons/fi";
import CustomerInfoForm from "../components/CustomerInfoForm";
import { emptyCustomer, validateCustomer } from "../utils/customerInfo";
import { buildWhatsAppUrl, buildGypsumOrderMessage, orderReference } from "../utils/whatsapp";
import gypsumSample1 from "../assets/gypsumSample1.jpg";
import gypsumSample2 from "../assets/gypsumSample2.jpg";
import gypsumSample3 from "../assets/gypsumSample3.jpg";

const sampleWork = [
  { src: gypsumSample1, caption: " Gold paper, Medium size" },
  { src: gypsumSample2, caption: "No Color, Large" },
  { src: gypsumSample3, caption: "Gold Paper, Small size" },
];

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const sizeOptions = ["Small", "Medium", "Large"];
const colorOptions = ["White", "Silver", "Gold", "Rose"];

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
  // Two steps: the piece itself, then the customer's delivery/contact info.
  const [step, setStep] = useState("piece");
  const [customer, setCustomer] = useState(() => emptyCustomer(user));
  const [customerErrors, setCustomerErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!previewImage) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewImage]);

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

  const goToStep = (next) => {
    setStep(next);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePieceSubmit = (e) => {
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

    goToStep("customer");
  };

  const handleCustomerChange = (name, value) => {
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (customerErrors[name]) setCustomerErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const errs = validateCustomer(customer);
    if (Object.keys(errs).length > 0) {
      setCustomerErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const { data: order } = await api.post("/gypsum", { ...form, customer });
      const reference = orderReference("GY", order._id);
      const message = buildGypsumOrderMessage({ reference, piece: form, customer });
      navigate("/order-placed", {
        state: {
          kind: "gypsum",
          reference,
          paymentMethod: customer.paymentMethod,
          whatsappUrl: buildWhatsAppUrl(message),
        },
      });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Something went wrong. Please try again.");
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

      {/* Sample Work */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold text-teal text-center mb-10"
          >
            Examples of Past Pieces
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sampleWork.map((item, i) => (
              <motion.div
                key={item.caption}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setPreviewImage(item)}
                  className="block w-full cursor-zoom-in"
                  aria-label={`View larger image: ${item.caption}`}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                  />
                </button>
                <p className="text-center text-sm text-neutral-600 font-body py-3">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
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
            className="relative scroll-mt-28"
            ref={formRef}
          >
            <div className="flex items-center justify-center gap-3 mb-6 font-body text-sm">
              {["Your Piece", "Your Details"].map((label, i) => {
                const active = (step === "piece" ? 0 : 1) === i;
                return (
                  <div key={label} className="flex items-center gap-3">
                    {i > 0 && <span className="w-8 h-px bg-neutral-300" />}
                    <span
                      className={`flex items-center gap-2 ${active ? "text-teal font-semibold" : "text-neutral-400"}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          active ? "bg-teal text-white" : "bg-neutral-200 text-neutral-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {step === "customer" ? (
              <motion.form
                key="customer"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleOrderSubmit}
                noValidate
                className="flex flex-col gap-4 bg-cream/60 rounded-3xl p-8 shadow-card"
              >
                <div className="bg-white rounded-2xl p-4 font-body text-sm text-neutral-600">
                  <p className="font-display font-semibold text-neutral-900 mb-1">Your piece</p>
                  <p>
                    <span dir="rtl" className="font-semibold text-teal">{form.arabicText}</span>
                    {" · "}
                    {form.size} · {form.color}
                  </p>
                  {form.notes.trim() && <p className="text-neutral-400 mt-1">{form.notes}</p>}
                </div>

                <CustomerInfoForm
                  value={customer}
                  errors={customerErrors}
                  onChange={handleCustomerChange}
                />

                {submitError && <p className="text-sm text-berry font-body">{submitError}</p>}

                <div className="flex flex-col-reverse sm:flex-row gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => goToStep("piece")}
                    disabled={submitting}
                    className="btn-secondary justify-center py-4 text-sm disabled:opacity-60"
                  >
                    <FiArrowLeft size={14} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary justify-center flex-1 py-4 text-sm disabled:opacity-60"
                  >
                    {submitting ? "Placing Order..." : "Complete Order"}
                  </button>
                </div>
                <p className="font-body text-xs text-neutral-400 text-center">
                  You'll be taken to WhatsApp to send us your order details.
                </p>
              </motion.form>
            ) : (
              <form
                onSubmit={handlePieceSubmit}
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
                  className="btn-primary justify-center py-4 text-sm mt-1"
                >
                  {user ? "Continue" : "Log In to Order"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full cursor-default"
            >
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                aria-label="Close preview"
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white text-neutral-700 flex items-center justify-center shadow-card hover:text-berry transition-colors"
              >
                <FiX size={18} />
              </button>
              <img
                src={previewImage.src}
                alt={previewImage.caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-card"
              />
              <p className="text-center text-sm text-white/90 font-body pt-4">
                {previewImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
