import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ArtworkCard from "../components/ArtworkCard";
import api from "../api/axios";
import { workshopImages } from "../data/images";

const behindScenes = [
  {
    title: "Workshop Preparation",
    image: workshopImages.artStudio,
  },
  {
    title: "Creative Setup",
    image: workshopImages.paintTable,
  },
  {
    title: "Art Materials",
    image: workshopImages.watercolor,
  },
];

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
      <section className="bg-cream pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
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
            Moments Of Creativity & Connection
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
            <p className="text-center text-neutral-500 font-body">Loading artworks...</p>
          )}

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
                <ArtworkCard key={artwork._id} artwork={artwork} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Behind The Scenes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">
              Behind The Scenes
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              The Creative Process
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Take a closer look at the preparation, atmosphere, and artistic
              details behind every Creative Detox workshop.
            </p>
          </div>

          {/* Behind Scenes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {behindScenes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-cream rounded-3xl overflow-hidden shadow-soft"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[320px] object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
