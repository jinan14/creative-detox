import { motion } from "framer-motion";
import { workshopImages } from "../data/images";

const values = [
  {
    title: "Creativity",
    text: "We encourage artistic exploration and creative freedom for everyone.",
  },
  {
    title: "Wellness",
    text: "Our workshops promote mindfulness, relaxation, and emotional balance.",
  },
  {
    title: "Inclusivity",
    text: "Creative Detox welcomes people of all ages, backgrounds, and skill levels.",
  },
  {
    title: "Mindfulness",
    text: "We believe art can help people reconnect with themselves and the present moment.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Idea Was Born",
    text: "Creative Detox started as a vision to combine art with emotional wellness.",
  },
  {
    year: "2025",
    title: "First Community Workshop",
    text: "The first collage and mindful painting workshops were organized.",
  },
  {
    year: "2025",
    title: "Growing Creative Community",
    text: "More participants joined workshops and creative events across the community.",
  },
  {
    year: "Today",
    title: "Creative Detox Today",
    text: "A growing artistic wellness platform focused on creativity and connection.",
  },
];

export default function About() {
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
            About Creative Detox
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-teal mb-6"
          >
            Creativity With Purpose
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={workshopImages.heroWorkshop}
              alt="People painting together in a creative workshop"
              className="rounded-[2rem] shadow-soft w-full h-[500px] object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-berry font-medium mb-4">Our Story</p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              Art As A Form Of Mental Escape
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-6">
              Creative Detox was created with the belief that art can become a
              peaceful escape from daily stress and pressure. Through workshops,
              creative activities, and artistic experiences, we aim to create a
              safe space where people can express themselves freely.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Our mission is to make creativity accessible, enjoyable, and
              healing for everyone regardless of age or artistic experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-berry font-medium mb-3">
              Vision & Values
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              What We Believe In
            </h2>

            <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Our values shape every workshop, activity, and community
              experience we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-soft"
              >
                <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                  {value.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-berry font-medium mb-3">
              Journey Timeline
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-4">
              Our Creative Journey
            </h2>
          </div>

          <div className="relative border-l-2 border-teal/20 ml-4 space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-teal"></div>

                <p className="text-berry font-semibold mb-2">
                  {item.year}
                </p>

                <h3 className="text-2xl font-semibold text-neutral-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={workshopImages.founders}
              alt="Artist sketching quietly in a mindful creative space"
              className="rounded-[2rem] shadow-soft w-full h-[500px] object-cover"
            />
          </motion.div>

          {/* Founder Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-berry font-medium mb-4">
              Meet The Founders
            </p>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-teal mb-6">
              Building A Space For Creative Healing
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-6">
              Creative Detox was founded with a passion for combining creativity
              and emotional wellness. The goal was to create a supportive
              environment where people can disconnect from stress and reconnect
              through artistic expression.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Today, Creative Detox continues to inspire individuals and
              communities through workshops that celebrate mindfulness,
              creativity, and connection.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
