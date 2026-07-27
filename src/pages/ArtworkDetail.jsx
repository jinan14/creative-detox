import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const categoryColors = {
  Painting: "bg-teal/10 text-teal",
  Collage: "bg-berry/10 text-berry",
  Carving: "bg-sage/10 text-sage-dark",
  Kids: "bg-rose-muted/20 text-rose-muted",
  Mindfulness: "bg-teal/10 text-teal-dark",
  Vitray: "bg-berry/10 text-berry",
};

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api
      .get(`/artworks/${id}`)
      .then(({ data }) => {
        if (cancelled) return;
        setArtwork(data);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("This artwork couldn't be found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!artwork?.available || added || adding) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      await addItem(artwork._id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-body text-neutral-500 hover:text-teal transition-colors mb-8"
          >
            <FiArrowLeft size={15} /> Back to Gallery
          </Link>

          {loading && <p className="text-center text-neutral-500 font-body py-20">Loading artwork...</p>}

          {!loading && error && <p className="text-center text-berry font-body py-20">{error}</p>}

          {!loading && !error && artwork && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-start"
            >
              {/* Image */}
              <div className="relative bg-white rounded-3xl shadow-card overflow-hidden">
                <div className="relative bg-cream flex items-center justify-center min-h-[420px] md:min-h-[560px]">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full max-h-[70vh] object-contain"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-body font-medium px-3 py-1 rounded-full ${
                      categoryColors[artwork.category] || "bg-neutral-100 text-neutral-600"
                    } backdrop-blur-sm`}
                  >
                    {artwork.category}
                  </span>
                  {!artwork.available && (
                    <span className="absolute top-4 right-4 text-xs font-body font-medium px-3 py-1 rounded-full bg-berry/90 text-white backdrop-blur-sm">
                      Sold
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">
                  {artwork.title}
                </h1>
                <p className="font-body text-neutral-400 mb-6">by {artwork.artist}</p>

                <p className="font-body text-neutral-600 leading-relaxed mb-8">
                  {artwork.description}
                </p>

                <div className="flex items-center justify-between bg-white rounded-3xl p-6 shadow-card">
                  <span className="font-display text-3xl font-bold text-teal">${artwork.price}</span>
                  <button
                    onClick={handleAddToCart}
                    disabled={!artwork.available || adding}
                    className={
                      !artwork.available
                        ? "inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 font-body text-sm font-semibold text-neutral-400 cursor-not-allowed"
                        : added
                        ? "inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-body text-sm font-semibold text-white"
                        : "btn-primary text-sm px-6 py-3 disabled:opacity-60"
                    }
                  >
                    {!artwork.available ? "Unavailable" : added ? (
                      <>
                        <FiCheck size={14} /> Added
                      </>
                    ) : adding ? (
                      "Adding..."
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
