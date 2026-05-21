import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal via-teal-dark to-neutral-900 px-10 py-16 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-berry/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-sage/20 blur-3xl" />

          <div className="relative z-10">
            <span className="inline-block font-body text-xs tracking-widest uppercase text-teal-light mb-4 bg-white/10 px-4 py-1.5 rounded-full">
              Limited Spots Available
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Create <br />
              <span className="text-rose-muted italic">Something Beautiful?</span>
            </h2>
            <p className="font-body text-neutral-300 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Join our community of artists, thinkers, and dreamers. Your next creative 
              escape is just one workshop away.
            </p>
            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-body font-semibold text-sm rounded-full hover:bg-berry hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
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
