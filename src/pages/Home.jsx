import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import WorkshopCard from "../components/WorkshopCard";
import ArtworkCard from "../components/ArtworkCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";
import api from "../api/axios";
import { participantImages, workshopImages } from "../data/images";

import {
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineUsers,
  HiOutlineLightBulb,
} from "react-icons/hi";

const featuredWorkshops = [
  {
    title: "Collage Art",
    description:
      "Express emotions and creativity through colorful collage compositions.",
    category: "Collage",
    image: workshopImages.collage,
  },
  {
    title: "Painting Therapy",
    description:
      "Relax and reconnect with yourself through mindful painting sessions.",
    category: "Painting",
    image: workshopImages.painting,
  },
  {
    title: "Kids Creative Sessions",
    description:
      "Fun artistic workshops designed to inspire creativity in children.",
    category: "Kids",
    image: workshopImages.kids,
  },
];

const features = [
  {
    icon: HiOutlineHeart,
    title: "Stress Relief",
    text: "Art helps you relax, recharge, and disconnect from daily stress.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Self Expression",
    text: "Explore your thoughts and emotions through creativity.",
  },
  {
    icon: HiOutlineUsers,
    title: "Community",
    text: "Connect with inspiring people in a welcoming creative space.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Creative Exploration",
    text: "Experiment with different art styles and discover new passions.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Workshop Participant",
    image: participantImages.artist,
    review:
      "Creative Detox gave me a peaceful space to reconnect with myself through art.",
  },
  {
    name: "Maya L.",
    role: "Art Enthusiast",
    image: participantImages.painter,
    review:
      "The workshops are inspiring, relaxing, and filled with positive energy.",
  },
  {
    name: "Nour A.",
    role: "Parent",
    image: participantImages.creative,
    review:
      "My child loved the creative sessions and came home excited every time.",
  },
];

const stats = [
  { number: "50+", label: "Workshops" },
  { number: "300+", label: "Participants" },
  { number: "1000+", label: "Art Sessions" },
  { number: "200+", label: "Community Members" },
];

export default function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/artworks")
      .then(({ data }) => {
        if (!cancelled) setArtworks(data.slice(0, 3));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen bg-cream flex items-center pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-berry font-medium mb-5">
              Art For Your Mental Escape
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-teal mb-6">
              Creativity That Heals & Inspires
            </h1>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mb-8">
              Creative Detox is a safe artistic space where creativity,
              mindfulness, and self-expression come together through inspiring
              workshops and community experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/workshops" className="btn-primary">
                Explore Workshops
              </Link>

              <Link to="/contact" className="btn-secondary">
                Join Now
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-berry/20 rounded-full blur-3xl"></div>

            <img
              src={workshopImages.heroWorkshop}
              alt="People painting together in a creative workshop"
              className="rounded-[2rem] shadow-soft relative z-10 w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">
              Featured Workshops
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              Explore Creative Experiences
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Discover workshops designed to inspire creativity, mindfulness,
              and emotional well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorkshops.map((workshop, index) => (
              <WorkshopCard key={index} {...workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      {artworks.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-berry font-medium mb-3">
                From The Gallery
              </p>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
                Original Artworks, Ready To Take Home
              </h2>

              <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Browse original pieces made by our community of artists,
                each one available to purchase and bring into your space.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork, index) => (
                <ArtworkCard key={artwork._id} artwork={artwork} index={index} />
              ))}
            </div>

            <div className="text-center mt-14">
              <Link to="/gallery" className="btn-primary">
                Shop Our Artworks
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Creative Detox */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">
              Why Creative Detox
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              More Than Just Art
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Our workshops are designed to nurture creativity, mindfulness,
              and emotional wellness in a welcoming environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-8 shadow-soft"
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-6">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">
              Testimonials
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              What Our Community Says
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Hear from participants who experienced creativity, connection,
              and mindfulness through our workshops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-teal text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-5xl font-bold mb-3">
                  {stat.number}
                </h3>

                <p className="text-white/80 text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
