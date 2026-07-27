import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
            Welcome Back
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-teal mb-8 text-center"
          >
            Log In
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-card"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>

              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>

              {error && <p className="text-xs text-berry font-body">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary justify-center py-4 text-sm mt-1 disabled:opacity-60"
              >
                {submitting ? "Logging In..." : "Log In"}
              </button>
            </form>

            <p className="text-sm text-neutral-500 text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-teal font-medium hover:text-berry transition-colors">
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
