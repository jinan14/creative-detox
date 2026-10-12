import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUsers,
  FiMessageSquare,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import api from "../api/axios";
import { inquiryTopics, isBookingTopic } from "../utils/inquiryTopics";
import { buildWhatsAppUrl, buildInquiryMessage } from "../utils/whatsapp";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const PHONE_RE = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  topic: "",
  name: "",
  phone: "",
  email: "",
  preferredDate: "",
  groupSize: "",
  message: "",
  website: "", // honeypot, hidden from real visitors
};

const today = () => new Date().toISOString().slice(0, 10);

function Field({ icon: Icon, error, multiline = false, children }) {
  return (
    <div>
      <div className="relative">
        <Icon
          size={15}
          className={`absolute left-3.5 text-neutral-400 pointer-events-none ${
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-berry font-body">{error}</p>}
    </div>
  );
}

// Contact-page enquiry: saved to the database, then handed to WhatsApp with a
// ready-made message. No account needed.
export default function InquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sentUrl, setSentUrl] = useState("");

  const booking = isBookingTopic(form.topic);

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleChange = (e) => update(e.target.name, e.target.value);

  const validate = () => {
    const e = {};
    if (!form.topic) e.topic = "Choose what you'd like to talk about";
    if (!form.name.trim()) e.name = "Your name is required";
    if (!form.phone.trim()) e.phone = "Your phone number is required";
    else if (!PHONE_RE.test(form.phone.trim())) e.phone = "Please enter a valid phone number";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) e.email = "Please enter a valid email";
    if (booking && form.groupSize && Number(form.groupSize) < 1) e.groupSize = "At least 1 person";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Booking-only fields are dropped for other topics.
    const payload = booking ? form : { ...form, preferredDate: "", groupSize: "" };

    setSubmitting(true);
    try {
      await api.post("/inquiries", payload);
      const url = buildWhatsAppUrl(buildInquiryMessage(payload));
      setSentUrl(url);
      setForm(emptyForm);
      setTimeout(() => {
        window.location.href = url;
      }, 900);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Washi tape holding the "paper" */}
      <span
        aria-hidden
        className="absolute -top-3 left-10 z-10 w-28 h-7 bg-teal/30 rotate-[-6deg] backdrop-blur-sm"
      />
      <span
        aria-hidden
        className="absolute -top-3 right-10 z-10 w-24 h-7 bg-berry/30 rotate-[5deg] backdrop-blur-sm"
      />

      <div className="relative bg-cream rounded-[2rem] shadow-card overflow-hidden">
        <div className="absolute inset-0 paper-grain pointer-events-none" />

        <AnimatePresence mode="wait">
          {sentUrl ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center text-center px-8 py-16 md:py-24"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-6"
              >
                <FiCheck size={34} className="text-teal" />
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-teal mb-3">Almost there!</h3>
              <p className="text-neutral-600 max-w-sm mb-8 leading-relaxed">
                We're opening WhatsApp with your message ready — just press{" "}
                <span className="font-semibold">send</span> and we'll get back to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={sentUrl} className="btn-primary justify-center">
                  <FaWhatsapp size={18} />
                  Open WhatsApp Again
                </a>
                <button type="button" onClick={() => setSentUrl("")} className="btn-secondary justify-center">
                  <FiRefreshCw size={15} />
                  New Message
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="relative flex flex-col gap-5 p-6 md:p-10"
            >
              <div>
                <p className="text-berry font-medium mb-2">Send Us A Message</p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-teal">
                  What's on your mind?
                </h3>
              </div>

              {/* Topic chips */}
              <fieldset>
                <legend className="font-body text-sm font-medium text-neutral-700 mb-3">
                  I'd like to talk about…
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {inquiryTopics.map((topic) => {
                    const selected = form.topic === topic.value;
                    return (
                      <motion.button
                        key={topic.value}
                        type="button"
                        onClick={() => update("topic", topic.value)}
                        whileTap={{ scale: 0.97 }}
                        aria-pressed={selected}
                        className={`flex items-center gap-3 text-left rounded-2xl border px-4 py-3 font-body text-sm transition-all duration-200 ${
                          selected
                            ? "border-teal bg-white ring-2 ring-teal/30 text-teal font-semibold shadow-soft"
                            : "border-neutral-200 bg-white/70 text-neutral-700 hover:border-teal/40 hover:bg-white"
                        }`}
                      >
                        <span className="text-xl leading-none">{topic.emoji}</span>
                        {topic.label}
                      </motion.button>
                    );
                  })}
                </div>
                {errors.topic && <p className="mt-2 text-xs text-berry font-body">{errors.topic}</p>}
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={FiUser} error={errors.name}>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    className={`${inputClass} pl-10`}
                  />
                </Field>
                <Field icon={FiPhone} error={errors.phone}>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone (e.g. +961 70 123 456)"
                    autoComplete="tel"
                    className={`${inputClass} pl-10`}
                  />
                </Field>
              </div>

              <Field icon={FiMail} error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  autoComplete="email"
                  className={`${inputClass} pl-10`}
                />
              </Field>

              {/* Booking details only for private / group / kids topics */}
              <AnimatePresence initial={false}>
                {booking && (
                  <motion.div
                    key="booking"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <Field icon={FiCalendar} error={errors.preferredDate}>
                        <input
                          name="preferredDate"
                          type="date"
                          min={today()}
                          value={form.preferredDate}
                          onChange={handleChange}
                          aria-label="Preferred date"
                          className={`${inputClass} pl-10`}
                        />
                      </Field>
                      <Field icon={FiUsers} error={errors.groupSize}>
                        <input
                          name="groupSize"
                          type="number"
                          min="1"
                          max="500"
                          value={form.groupSize}
                          onChange={handleChange}
                          placeholder="Number of people"
                          className={`${inputClass} pl-10`}
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Field icon={FiMessageSquare} error={errors.message} multiline>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    booking
                      ? "Tell us a bit about the occasion or what you'd like to create"
                      : "Your message"
                  }
                  rows={4}
                  className={`${inputClass} pl-10 resize-none`}
                />
              </Field>

              {/* Honeypot: visually hidden, ignored by people, filled by bots */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              {errors.submit && <p className="text-sm text-berry font-body">{errors.submit}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary justify-center py-4 text-sm disabled:opacity-60"
              >
                <FaWhatsapp size={18} />
                {submitting ? "Sending..." : "Send on WhatsApp"}
              </button>
              <p className="font-body text-xs text-neutral-400 text-center -mt-2">
                No account needed — you'll just press send in WhatsApp.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
