import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiImage, FiCalendar, FiUsers, FiBox, FiArrowRight } from "react-icons/fi";
import api from "../../api/axios";

export default function AdminOverview() {
  const [counts, setCounts] = useState({
    artworks: null,
    workshops: null,
    registrations: null,
    gypsum: null,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      api.get("/artworks"),
      api.get("/workshops"),
      api.get("/registrations"),
      api.get("/gypsum"),
    ])
      .then(([artworksRes, workshopsRes, registrationsRes, gypsumRes]) => {
        if (cancelled) return;
        setCounts({
          artworks: artworksRes.data.length,
          workshops: workshopsRes.data.length,
          registrations: registrationsRes.data.length,
          gypsum: gypsumRes.data.length,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    {
      label: "Artworks",
      count: counts.artworks,
      to: "/admin/artworks",
      icon: FiImage,
    },
    {
      label: "Workshops",
      count: counts.workshops,
      to: "/admin/workshops",
      icon: FiCalendar,
    },
    {
      label: "Registrations",
      count: counts.registrations,
      to: "/admin/registrations",
      icon: FiUsers,
    },
    {
      label: "Gypsum Orders",
      count: counts.gypsum,
      to: "/admin/gypsum",
      icon: FiBox,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {cards.map(({ label, count, to, icon: Icon }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-card flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-teal/10 flex items-center justify-center">
              <Icon size={18} className="text-teal" />
            </div>
            <span className="font-display text-3xl font-bold text-neutral-900">
              {count === null ? "…" : count}
            </span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-neutral-900 mb-1">{label}</h3>
            <Link
              to={to}
              className="inline-flex items-center gap-1.5 text-sm font-body text-teal hover:text-berry transition-colors"
            >
              Manage {label.toLowerCase()} <FiArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
