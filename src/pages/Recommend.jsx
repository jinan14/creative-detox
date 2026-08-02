import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCloudRain,
  FiSun,
  FiHeart,
  FiBatteryCharging,
  FiEdit3,
  FiWind,
  FiZap,
  FiFrown,
  FiSend,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import WorkshopCard from "../components/WorkshopCard";

const emotions = [
  { label: "Stressed", icon: FiCloudRain },
  { label: "Anxious", icon: FiFrown },
  { label: "Happy", icon: FiSun },
  { label: "Lonely", icon: FiHeart },
  { label: "Burned Out", icon: FiBatteryCharging },
  { label: "Creative", icon: FiEdit3 },
  { label: "Calm", icon: FiWind },
  { label: "Motivated", icon: FiZap },
];

export default function Recommend() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleEmotionClick = (label) => {
    setSelectedEmotion(label);
    setFreeText("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const input = freeText.trim() || selectedEmotion;
    if (!input) {
      setError("Pick a feeling or describe how you feel first.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);
    try {
      const { data } = await api.post("/ai/recommend", { input });
      setResults(data.workshops || []);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            AI Workshop Matching
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            How Are You Feeling Today?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Tell us your mood and we'll match you with the workshops best
            suited to help you reconnect through art.
          </motion.p>
        </div>
      </section>

      {/* Emotion Picker + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 bg-cream/60 rounded-3xl p-8 shadow-card"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {emotions.map(({ label, icon: Icon }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => handleEmotionClick(label)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 font-body text-sm font-medium transition-all duration-200 ${
                    selectedEmotion === label
                      ? "bg-teal text-white shadow-soft"
                      : "bg-white text-neutral-600 hover:bg-berry/10 hover:text-berry"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={freeText}
                onChange={(e) => {
                  setFreeText(e.target.value);
                  setSelectedEmotion("");
                  setError("");
                }}
                placeholder="Or describe how you feel in your own words..."
                rows={3}
                className="w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200 resize-none"
              />
            </div>

            {error && <p className="text-xs text-berry font-body -mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center py-4 text-sm disabled:opacity-60"
            >
              {loading ? (
                "Finding your match..."
              ) : user ? (
                <>
                  <FiSend size={15} />
                  Get My Recommendation
                </>
              ) : (
                "Log In to Get Recommendations"
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {results !== null && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-24 bg-white"
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-display font-bold text-teal mb-8 text-center">
                {results.length > 0 ? "Recommended For You" : "No Matches Found"}
              </h2>

              {results.length === 0 && (
                <p className="text-center text-neutral-500 font-body">
                  We couldn't find a workshop matching that feeling right now —
                  try describing it differently or check back as new workshops
                  are added.
                </p>
              )}

              {results.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((workshop, index) => (
                    <WorkshopCard key={workshop._id} workshop={workshop} index={index} />
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
