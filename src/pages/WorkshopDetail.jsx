import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import api from "../api/axios";
import RegistrationForm from "../components/RegistrationForm";
import resolveImageUrl from "../utils/resolveImageUrl";

const categoryColors = {
  Painting: "bg-teal/10 text-teal",
  Collage: "bg-berry/10 text-berry",
  Carving: "bg-sage/10 text-sage-dark",
  Kids: "bg-rose-muted/20 text-rose-muted",
  Mindfulness: "bg-teal/10 text-teal-dark",
  Vitray: "bg-berry/10 text-berry",
};

const formatDate = (date) => {
  if (!date) return "Coming Soon";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export default function WorkshopDetail() {
  const { id } = useParams();

  const [workshop, setWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([api.get(`/workshops/${id}`), api.get("/workshops")])
      .then(([detailRes, listRes]) => {
        if (cancelled) return;
        setWorkshop(detailRes.data);
        setWorkshops(listRes.data);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("This workshop couldn't be found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const spotsLeft = Number(workshop?.seatsRemaining);
  const hasLimitedSpots = Number.isFinite(spotsLeft) && spotsLeft <= 5;

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 text-sm font-body text-neutral-500 hover:text-teal transition-colors mb-8"
          >
            <FiArrowLeft size={15} /> Back to Workshops
          </Link>

          {loading && <p className="text-center text-neutral-500 font-body py-20">Loading workshop...</p>}

          {!loading && error && <p className="text-center text-berry font-body py-20">{error}</p>}

          {!loading && !error && workshop && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-start mb-20"
            >
              {/* Image */}
              <div className="relative bg-white rounded-3xl shadow-card overflow-hidden">
                <div className="relative bg-cream flex items-center justify-center min-h-[420px] md:min-h-[560px]">
                  <img
                    src={resolveImageUrl(workshop.image)}
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-body font-medium px-3 py-1 rounded-full ${
                      categoryColors[workshop.category] || "bg-neutral-100 text-neutral-600"
                    } backdrop-blur-sm`}
                  >
                    {workshop.category}
                  </span>
                  {hasLimitedSpots && (
                    <span className="absolute top-4 right-4 text-xs font-body font-medium px-3 py-1 rounded-full bg-berry/90 text-white backdrop-blur-sm">
                      {spotsLeft} spots left
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">
                  {workshop.title}
                </h1>
                <span className="inline-block w-fit text-xs font-body text-sage-dark bg-sage/10 px-2.5 py-1 rounded-full mb-6">
                  {workshop.difficulty ?? workshop.level ?? "All Levels"}
                </span>

                <p className="font-body text-neutral-600 leading-relaxed mb-8">
                  {workshop.description}
                </p>

                <div className="grid grid-cols-2 gap-4 bg-white rounded-3xl p-6 shadow-card mb-6">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <FiCalendar size={16} className="text-teal" />
                    <span className="font-body text-sm">{formatDate(workshop.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <FiClock size={16} className="text-teal" />
                    <span className="font-body text-sm">
                      {workshop.time ? `${workshop.time} · ` : ""}
                      {workshop.duration ?? "2 Hours"}
                    </span>
                  </div>
                  {workshop.location && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <FiMapPin size={16} className="text-teal" />
                      <span className="font-body text-sm">{workshop.location}</span>
                    </div>
                  )}
                  {Number.isFinite(spotsLeft) && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <FiUsers size={16} className="text-teal" />
                      <span className="font-body text-sm">
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between bg-white rounded-3xl p-6 shadow-card">
                  <span className="font-display text-3xl font-bold text-teal">
                    {workshop.price ? `$${workshop.price}` : "Free"}
                  </span>
                  <a
                    href="#register"
                    className="btn-primary text-sm px-6 py-3"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {!loading && !error && workshop && (
            <motion.div
              id="register"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto scroll-mt-28"
            >
              <p className="text-berry font-medium mb-2 text-center">Register For This Workshop</p>
              <h2 className="text-3xl font-display font-bold text-teal mb-8 text-center">
                Reserve Your Spot
              </h2>
              <RegistrationForm workshops={workshops} initialWorkshopId={workshop._id} />
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
