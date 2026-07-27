import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import WorkshopCard from "../components/WorkshopCard";
import RegistrationForm from "../components/RegistrationForm";
import api from "../api/axios";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;

    api
      .get("/workshops")
      .then(({ data }) => {
        if (!cancelled) setWorkshops(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load workshops right now. Please try again later.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = ["All", ...new Set(workshops.map((w) => w.category).filter(Boolean))];

  const filteredWorkshops =
    activeCategory === "All"
      ? workshops
      : workshops.filter(
          (workshop) => workshop.category === activeCategory
        );

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
            Creative Workshops
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Explore Artistic Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Discover creative workshops designed to inspire mindfulness,
            self-expression, relaxation, and artistic exploration.
          </motion.p>
        </div>
      </section>

      {/* Workshop Filters */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === category
                    ? "bg-teal text-white shadow-soft hover:bg-berry"
                    : "bg-cream text-neutral-700 hover:bg-berry/10 hover:text-berry"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading && (
            <p className="text-center text-neutral-500 font-body">Loading workshops...</p>
          )}

          {!loading && error && (
            <p className="text-center text-berry font-body">{error}</p>
          )}

          {!loading && !error && filteredWorkshops.length === 0 && (
            <p className="text-center text-neutral-500 font-body">
              No workshops available yet — check back soon.
            </p>
          )}

          {!loading && !error && filteredWorkshops.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkshops.map((workshop) => (
                <motion.div
                  key={workshop._id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <WorkshopCard workshop={workshop} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-berry font-medium mb-4">
              Register For A Workshop
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              Join Our Next Creative Experience
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-6">
              Whether you are looking for relaxation, creative expression, or a
              new artistic experience, our workshops are designed to help you
              reconnect with yourself through art.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Fill out the registration form and we will contact you with all
              the workshop details and confirmation information.
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <RegistrationForm workshops={workshops} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
