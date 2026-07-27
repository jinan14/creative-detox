import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
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

    setSubmitting(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-md mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-3 text-center"
          >
            Join Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-teal mb-8 text-center"
          >
            Create Account
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-card"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-berry font-body">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <FiLock size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-berry font-body">{errors.password}</p>}
              </div>

              {errors.form && <p className="text-xs text-berry font-body">{errors.form}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary justify-center py-4 text-sm mt-1 disabled:opacity-60"
              >
                {submitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-neutral-500 text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-teal font-medium hover:text-berry transition-colors">
                Log In
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
