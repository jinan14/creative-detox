import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { workshopImages } from "../data/images";

const galleryImages = [
  {
    id: 1,
    image: workshopImages.collageKids,
    title: "Collage Art Workshop",
    category: "Collage",
  },
  {
    id: 2,
    image: workshopImages.cups,
    title: "Painting Therapy Session",
    category: "Vitray Art on Cups",
  },
  {
    id: 3,
    image: workshopImages.participants,
    title: "Creative Participants",
    category: "Vitray Workshop",
  },
  {
    id: 4,
    image: workshopImages.angela,
    title: "Kids Creative Day",
    category: "Kids",
  },
  {
    id: 5,
    image: workshopImages.preparation,
    title: "Workshop Preparation",
    category: "Carving Workshop",
  },
  {
    id: 6,
    image: workshopImages.results,
    title: "Creative Results",
    category: "Carving",
  },
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-berry font-medium mb-3">Gallery</p>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
            Creative Moments
          </h2>

          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Explore highlights from our workshops, creative sessions, and the
            beautiful art created by our community.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl shadow-soft cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm mb-1 opacity-90">{item.category}</p>

                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-rose-muted transition-colors"
              >
                <HiX size={32} />
              </button>

              {/* Modal Image */}
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-cover rounded-3xl"
              />

              {/* Modal Info */}
              <div className="bg-white p-6 rounded-b-3xl">
                <p className="text-berry text-sm mb-2">
                  {selectedImage.category}
                </p>

                <h3 className="text-2xl font-display font-bold text-teal">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
