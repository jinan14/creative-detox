import { motion } from "framer-motion";
import { workshopImages } from "../data/images";
import WatercolorBackground from "../components/home/WatercolorBackground";
import BrushUnderline from "../components/home/BrushUnderline";
import ValuesBlend from "../components/about/ValuesBlend";
import JourneyTimeline from "../components/about/JourneyTimeline";

export default function About() {
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
            About Creative Detox
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Creativity With <BrushUnderline>Purpose</BrushUnderline>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            Creative Detox is a creative wellness platform that helps people
            reconnect with themselves through art, mindfulness, and community
            experiences.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.figure
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0 }}
            className="relative bg-white p-3 pb-4 rounded-md shadow-card max-w-md mx-auto lg:mx-0"
          >
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-berry/40 rotate-[-4deg]"
            />
            <img
              src={workshopImages.founders}
              alt="The Creative Detox founders"
              className="w-full h-[420px] object-cover rounded-sm"
            />
            <figcaption className="font-hand text-2xl text-neutral-600 text-center mt-2">
              the founders ♡
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-berry font-medium mb-4">Our Story</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              Art As A Form Of Mental <BrushUnderline>Escape</BrushUnderline>
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed">
              We started Creative Detox believing art can be a peaceful escape from
              daily stress. Our workshops are a safe, welcoming space where anyone —
              whatever their age or experience — can slow down, express themselves,
              and reconnect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="relative py-24 bg-cream overflow-hidden">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-berry font-medium mb-3">Vision & Values</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal">
              What We <BrushUnderline>Believe</BrushUnderline> In
            </h2>
          </div>

          <ValuesBlend />

          <p className="font-hand text-2xl text-sage text-center mt-10 lg:mt-16 -rotate-1">
            where our values meet, the colours blend ✦
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-berry font-medium mb-3">Journey Timeline</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal">
              Our Creative <BrushUnderline>Journey</BrushUnderline>
            </h2>
          </div>

          <JourneyTimeline />
        </div>
      </section>
    </main>
  );
}
