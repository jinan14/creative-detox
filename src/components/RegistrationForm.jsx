import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { FiCheck, FiUser, FiMail, FiPhone, FiCalendar, FiMessageSquare } from "react-icons/fi";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const formatDate = (date) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export default function RegistrationForm({ workshops = [], initialWorkshopId = "" }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    workshop: initialWorkshopId,
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialWorkshopId) {
      setForm((prev) => ({ ...prev, workshop: initialWorkshopId }));
    }
  }, [initialWorkshopId]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.workshop) e.workshop = "Please select a workshop";
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
      await api.post("/registrations", { workshopId: form.workshop });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", workshop: "", date: "", message: "" });
    } catch (err) {
      setErrors({
        workshop: err.response?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
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
              You're Registered!
            </h3>
            <p className="font-body text-sm text-neutral-500 mb-6 max-w-xs">
              We'll send a confirmation email within 24 hours. Can't wait to create with you.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary text-sm"
            >
              Register for Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <FiUser size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`${inputClass} pl-10`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-berry font-body">{errors.name}</p>}
          </div>
          <div>
            <div className="relative">
              <FiMail size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                className={`${inputClass} pl-10`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-berry font-body">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <FiPhone size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
              className={`${inputClass} pl-10`}
            />
          </div>
          <div className="relative">
            <FiCalendar size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Preferred Date"
              type="date"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <select
            name="workshop"
            value={form.workshop}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a Workshop</option>
            {workshops.map((w) => (
              <option key={w._id} value={w._id} disabled={w.seatsRemaining <= 0}>
                {w.title} — {formatDate(w.date)}
                {w.seatsRemaining <= 0 ? " (Full)" : ""}
              </option>
            ))}
          </select>
          {errors.workshop && <p className="mt-1 text-xs text-berry font-body">{errors.workshop}</p>}
        </div>

        <div className="relative">
          <FiMessageSquare size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Any notes or questions? (optional)"
            rows={4}
            className={`${inputClass} pl-10 resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary justify-center py-4 text-sm mt-1 disabled:opacity-60"
        >
          {submitting ? "Registering..." : "Register Now"}
        </button>
      </form>
    </div>
  );
}