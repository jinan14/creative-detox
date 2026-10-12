import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import WatercolorBackground from "./home/WatercolorBackground";
import BrushUnderline from "./home/BrushUnderline";

export default function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#f6e9df_0%,#f1dcd8_55%,#ecc9d3_100%)] border border-berry/10 shadow-soft px-10 py-16 text-center"
        >
          <WatercolorBackground intensity={0.16} />

          <div className="relative z-10">
            <span className="inline-block font-body text-xs tracking-widest uppercase text-berry mb-4 bg-white/70 px-4 py-1.5 rounded-full">
              Limited Spots Available
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-teal mb-4 leading-tight">
              Ready to Create <br />
              <span className="text-berry italic">
                Something <BrushUnderline color="var(--color-teal-light)">Beautiful?</BrushUnderline>
              </span>
            </h2>
            <p className="font-body text-neutral-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Join our community of artists, thinkers, and dreamers. Your next creative
              escape is just one workshop away.
            </p>
            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-8 py-4 bg-berry text-white font-body font-semibold text-sm rounded-full hover:bg-teal hover:-translate-y-1 transition-all duration-300 shadow-soft"
            >
              Register for a Workshop
              <FiArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
