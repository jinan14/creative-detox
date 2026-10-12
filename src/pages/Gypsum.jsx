import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
  FiType,
  FiMessageSquare,
  FiMaximize2,
  FiChevronDown,
  FiCheck,
  FiFeather,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
import CustomerInfoForm from "../components/CustomerInfoForm";
import { emptyCustomer, validateCustomer } from "../utils/customerInfo";
import { buildWhatsAppUrl, buildGypsumOrderMessage, orderReference } from "../utils/whatsapp";
import {
  shapeOptions,
  sizeOptions,
  sizePrices,
  sizeDimensions,
  shapeLabel,
  designAllowed,
  priceBreakdown,
  GOLD_PAPER_PRICE,
  DESIGN_PRICE,
} from "../utils/gypsumOptions";
import gypsumSample1 from "../assets/gypsumSample1.jpg";
import gypsumSample2 from "../assets/gypsumSample2.jpg";
import gypsumSample3 from "../assets/gypsumSample3.jpg";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";

const sampleWork = [
  { src: gypsumSample1, caption: " Gold paper, Medium size" },
  { src: gypsumSample2, caption: "No Color, Large" },
  { src: gypsumSample3, caption: "Gold Paper, Small size" },
];

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

// Small outline previews for the shape picker.
const shapePreviewClass = {
  rectangle: "w-7 h-4 rounded-[3px]",
  square: "w-5 h-5 rounded-[3px]",
  circle: "w-5 h-5 rounded-full",
};

function OptionToggle({ selected, disabled, onClick, title, price, hint, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`relative flex flex-col items-start text-left rounded-2xl border p-4 transition-all duration-200 ${
        disabled
          ? "border-neutral-200 bg-neutral-50 opacity-60 cursor-not-allowed"
          : selected
            ? "border-teal bg-white ring-2 ring-teal/30"
            : "border-neutral-200 bg-white hover:border-teal/40"
      }`}
    >
      <span
        className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
          selected ? "bg-teal border-teal text-white" : "border-neutral-300 bg-white"
        }`}
      >
        {selected && <FiCheck size={12} />}
      </span>
      <span className="flex items-center gap-2 font-display font-semibold text-neutral-900 pr-7">
        {children}
        {title}
      </span>
      <span className="block font-body text-xs text-teal font-semibold mt-1">+${price}</span>
      <span className="block font-body text-xs text-neutral-500 mt-1">{hint}</span>
    </button>
  );
}

export default function Gypsum() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    arabicText: "",
    notes: "",
    shape: "rectangle",
    size: "",
    goldPaper: false,
    design: false,
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
    return e;
  };

  const updateForm = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // A design can't fit on a small piece, so drop it if the size shrinks.
      if (!designAllowed(next.size)) next.design = false;
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChange = (e) => updateForm(e.target.name, e.target.value);

  const price = priceBreakdown(form);

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
      const message = buildGypsumOrderMessage({ reference, piece: form, price, customer });
      navigate("/order-placed", {
        state: {
          kind: "gypsum",
          reference,
          total: order.price,
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
      <section className="relative overflow-hidden bg-cream pt-36 pb-24">
        <WatercolorBackground intensity={0.35} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
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
            Order a <BrushUnderline>Personalized</BrushUnderline> Piece
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
                <div className="bg-white rounded-2xl p-5 font-body text-sm text-neutral-600">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-display font-semibold text-neutral-900">Your piece</p>
                      <p dir="rtl" className="font-semibold text-teal text-lg text-left">
                        {form.arabicText}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep("piece")}
                      className="text-xs text-teal hover:text-berry transition-colors whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                  <p>
                    {shapeLabel(form.shape)} · {form.size} ({sizeDimensions(form.shape, form.size)})
                  </p>
                  {form.notes.trim() && (
                    <p className="text-neutral-400 mt-1 break-words">“{form.notes.trim()}”</p>
                  )}
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-1">
                    {price.lines.map((line) => (
                      <div key={line.label} className="flex justify-between">
                        <span>{line.label}</span>
                        <span>${line.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-display font-bold text-teal text-base mt-1">
                      <span>Total</span>
                      <span>${price.total}</span>
                    </div>
                  </div>
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
                  <label className="block font-body text-sm font-medium text-neutral-700 mb-2">
                    Arabic Name or Word
                  </label>
                  <div className="relative">
                    <FiType
                      size={15}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                    <input
                      name="arabicText"
                      value={form.arabicText}
                      onChange={handleChange}
                      placeholder="اكتب الاسم أو الكلمة"
                      dir="rtl"
                      className={`${inputClass} pr-10`}
                    />
                  </div>
                  {errors.arabicText && (
                    <p className="mt-1 text-xs text-berry font-body">{errors.arabicText}</p>
                  )}
                </div>

                <div>
                  <span className="block font-body text-sm font-medium text-neutral-700 mb-2">
                    Shape
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {shapeOptions.map((option) => {
                      const selected = form.shape === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateForm("shape", option.value)}
                          aria-pressed={selected}
                          className={`flex flex-col items-center gap-2 rounded-2xl border py-3 px-2 font-body text-sm transition-all duration-200 ${
                            selected
                              ? "border-teal bg-white ring-2 ring-teal/30 text-teal font-semibold"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-teal/40"
                          }`}
                        >
                          <span className="h-5 flex items-center">
                            <span
                              className={`block border-2 ${selected ? "border-teal" : "border-neutral-400"} ${shapePreviewClass[option.value]}`}
                            />
                          </span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gypsum-size"
                    className="block font-body text-sm font-medium text-neutral-700 mb-2"
                  >
                    Size
                  </label>
                  <div className="relative">
                    <FiMaximize2
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                    <select
                      id="gypsum-size"
                      name="size"
                      value={form.size}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pl-10 pr-10 cursor-pointer`}
                    >
                      <option value="">Select Size</option>
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size} — {sizeDimensions(form.shape, size)} · ${sizePrices[size]}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                  {errors.size && <p className="mt-1 text-xs text-berry font-body">{errors.size}</p>}
                </div>

                <div>
                  <span className="block font-body text-sm font-medium text-neutral-700 mb-2">
                    Extras
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <OptionToggle
                      selected={form.goldPaper}
                      onClick={() => updateForm("goldPaper", !form.goldPaper)}
                      title="Gold Paper"
                      price={GOLD_PAPER_PRICE}
                      hint="Gold leaf finish on the lettering."
                    >
                      <span className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600" />
                    </OptionToggle>
                    <OptionToggle
                      selected={form.design}
                      disabled={!designAllowed(form.size)}
                      onClick={() => updateForm("design", !form.design)}
                      title="Design"
                      price={DESIGN_PRICE}
                      hint={
                        designAllowed(form.size)
                          ? "Describe it in the notes or send us an inspiration on WhatsApp."
                          : "Not available for small pieces — choose Medium or Large."
                      }
                    >
                      <FiFeather size={15} className="text-teal" />
                    </OptionToggle>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gypsum-notes"
                    className="block font-body text-sm font-medium text-neutral-700 mb-2"
                  >
                    Notes <span className="font-normal text-neutral-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <FiMessageSquare
                      size={15}
                      className="absolute left-3.5 top-3.5 text-neutral-400 pointer-events-none"
                    />
                    <textarea
                      id="gypsum-notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder={
                        form.design
                          ? "Describe the design you'd like, or tell us you'll send an inspiration on WhatsApp."
                          : "Any special requests?"
                      }
                      rows={4}
                      className={`${inputClass} pl-10 resize-none`}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 font-body text-sm text-neutral-600">
                  {form.size ? (
                    <div className="flex flex-col gap-1">
                      {price.lines.map((line) => (
                        <div key={line.label} className="flex justify-between">
                          <span>{line.label}</span>
                          <span>${line.amount}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-display font-bold text-teal text-lg pt-2 mt-1 border-t border-neutral-100">
                        <span>Total</span>
                        <span>${price.total}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-neutral-400">
                      Select a size to see the price — from ${sizePrices.Small}.
                    </p>
                  )}
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
