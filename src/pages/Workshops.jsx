import { useState } from "react";
import { motion } from "framer-motion";

import WorkshopCard from "../components/WorkshopCard";
import RegistrationForm from "../components/RegistrationForm";
import { workshopImages } from "../data/images";

const workshops = [
  {
    title: "Collage Therapy Workshop",
    description:
      "Express your emotions and creativity through collage and mixed media art.",
    category: "Collage",
    duration: "2 Hours",
    level: "Beginner",
    date: "June 12, 2026",
    image: workshopImages.collage,
  },
  {
    title: "Acrylic Painting Session",
    description:
      "Relax and enjoy guided painting exercises in a mindful environment.",
    category: "Painting",
    duration: "3 Hours",
    level: "All Levels",
    date: "June 18, 2026",
    image: workshopImages.painting,
  },
  {
    title: "Carving on Gypsum",
    description:
      "Learn hand-carving techniques on gypsum blocks to create textured reliefs and small sculptures.",
    category: "Carving",
    duration: "3 Hours",
    level: "Intermediate",
    date: "June 21, 2026",
    image: workshopImages.gypsum,
  },
  {
    title: "Kids Creative Day",
    description:
      "Fun art activities designed to inspire imagination and creativity in children.",
    category: "Kids",
    duration: "4 Hours",
    level: "Kids",
    date: "June 25, 2026",
    image: workshopImages.kids,
  },
  {
    title: "Mindful Drawing Session",
    description:
      "Slow down and reconnect with yourself through calming drawing exercises.",
    category: "Mindfulness",
    duration: "2 Hours",
    level: "All Levels",
    date: "July 2, 2026",
    image: workshopImages.mindfulDrawing,
  },
  {
    title: "Vitray Art Workshop",
    description:
      "Discover the luminous craft of vitray by painting glass-inspired designs with translucent color and light.",
    category: "Painting",
    duration: "3 Hours",
    level: "Intermediate",
    date: "July 8, 2026",
    image: workshopImages.vitray,
  },
];

const categories = [
  "All",
  "Painting",
  "Collage",
  "Carving",
  "Kids",
  "Mindfulness",
];

export default function Workshops() {
  const [activeCategory, setActiveCategory] = useState("All");

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <WorkshopCard {...workshop} />
              </motion.div>
            ))}
          </div>
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
            <RegistrationForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
