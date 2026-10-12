import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import WorkshopCard from "../components/WorkshopCard";
import ArtworkCard from "../components/ArtworkCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";
import HeroGallery from "../components/home/HeroGallery";
import WordMarquee from "../components/home/WordMarquee";
import BrushReveal from "../components/home/BrushReveal";
import BrushUnderline from "../components/home/BrushUnderline";
import CarvingBadge from "../components/home/CarvingBadge";
import StatsSection from "../components/home/StatsSection";
import WhySection from "../components/home/WhySection";
import api from "../api/axios";
import { participantImages, workshopImages } from "../data/images";
import gypsumSample1 from "../assets/gypsumSample1.jpg";

import { HiOutlineSparkles } from "react-icons/hi";

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

export default function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/artworks")
      .then(({ data }) => {
        if (!cancelled) setArtworks(data.slice(0, 5));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="overflow-hidden">
      <HeroGallery artworks={artworks} />

      <WordMarquee />

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

      {/* AI Workshop Recommendation Teaser */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-teal to-berry px-8 py-10 md:px-12 text-center md:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <HiOutlineSparkles size={26} className="text-white" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-white/70 mb-2">
                  Powered By AI
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                  Not Sure Which Workshop Fits You?
                </h3>
                <p className="font-body text-white/80 text-sm max-w-md">
                  Tell us how you're feeling and let our AI match you with the
                  right creative experience.
                </p>
              </div>
            </div>

            <Link
              to="/recommend"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-teal font-body font-semibold text-sm rounded-full hover:-translate-y-1 hover:bg-cream transition-all duration-300 shadow-lg flex-shrink-0"
            >
              Get My Recommendation
              <FiArrowRight size={16} />
            </Link>
          </motion.div>
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
              {artworks.slice(0, 3).map((artwork, index) => (
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

      {/* Custom Gypsum Carving */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative pb-10 lg:pb-0">
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal/20 rounded-full blur-3xl" />
            <BrushReveal className="relative z-10">
              <img
                src={gypsumSample1}
                alt="A custom hand-carved gypsum piece with Arabic calligraphy"
                className="rounded-[2rem] shadow-soft w-full h-[420px] object-cover"
              />
            </BrushReveal>
            <CarvingBadge className="absolute z-20 -bottom-2 left-4 lg:-bottom-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-berry font-medium mb-4">Custom Gypsum Carvings</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              Carve Your Own Arabic Piece
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-8 max-w-xl">
              Order a hand-carved gypsum piece featuring your name or a word
              of your choosing in Arabic calligraphy, in the shape and size
              you prefer, with optional gold paper — a personal, lasting piece
              of art for your space.
            </p>

            <Link to="/gypsum" className="btn-primary">
              Customize Your Piece
            </Link>
          </motion.div>
        </div>
      </section>

      <WhySection />

      {/* Testimonials */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Dotted sketchbook paper */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--color-teal-light)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-berry font-medium mb-3">Testimonials</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              What Our <BrushUnderline>Community</BrushUnderline> Says
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Hear from participants who experienced creativity, connection,
              and mindfulness through our workshops.
            </p>
            <p className="font-hand text-2xl text-sage mt-4 rotate-[-2deg]">
              little notes left on our wall ↓
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} index={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
