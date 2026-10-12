import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ArtworkCard from "../components/ArtworkCard";
import api from "../api/axios";
import ServerWakeNotice from "../components/ServerWakeNotice";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";

// Placeholder matching ArtworkCard's layout, shown while /artworks loads so
// the grid appears immediately instead of a lone "Loading..." line.
function ArtworkCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft animate-pulse">
      <div className="h-96 bg-cream" />
      <div className="px-6 pt-6 pb-6">
        <div className="h-5 w-2/3 rounded-full bg-neutral-100 mb-3" />
        <div className="h-3 w-1/3 rounded-full bg-neutral-100 mb-5" />
        <div className="h-3 w-full rounded-full bg-neutral-100 mb-2" />
        <div className="h-3 w-5/6 rounded-full bg-neutral-100 mb-6" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-12 rounded-full bg-teal/10" />
          <div className="h-10 w-28 rounded-full bg-teal/10" />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/artworks")
      .then(({ data }) => {
        if (!cancelled) setArtworks(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load the gallery right now. Please try again later.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
            Creative Gallery
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Moments Of <BrushUnderline>Creativity</BrushUnderline> & Connection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Explore inspiring moments from our workshops, creative activities,
            and the artistic experiences shared by our growing community.
          </motion.p>
        </div>
      </section>

      {/* Artwork Gallery */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">Art Gallery</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              Shop The Collection
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Every piece is one-of-a-kind, created by our community of artists
              and available to bring a little more calm into your space.
            </p>
          </div>

          {loading && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              aria-busy="true"
              aria-label="Loading artworks"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <ArtworkCardSkeleton key={i} />
              ))}
            </div>
          )}
          <ServerWakeNotice loading={loading} />

          {!loading && error && (
            <p className="text-center text-berry font-body">{error}</p>
          )}

          {!loading && !error && artworks.length === 0 && (
            <p className="text-center text-neutral-500 font-body">
              No artworks available yet — check back soon.
            </p>
          )}

          {!loading && !error && artworks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork, index) => (
                <ArtworkCard
                  key={artwork._id}
                  artwork={artwork}
                  index={index}
                  priority={index < 3}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
