import { motion } from "framer-motion";

import GalleryGrid from "../components/GalleryGrid";

const behindScenes = [
  {
    title: "Workshop Preparation",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Creative Setup",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Art Materials",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Gallery() {
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

      {/* Gallery Grid */}
      <GalleryGrid />

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