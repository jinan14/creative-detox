import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PaintCanvas from "./PaintCanvas";
import HeroHeadline from "./HeroHeadline";
import { workshopImages } from "../../data/images";

const sidePieces = [
  { src: workshopImages.heroWorkshop, alt: "People painting together", className: "left-[3%] top-[22%] rotate-[-8deg]", delay: 1.1 },
  { src: workshopImages.vitray, alt: "Stained glass artwork", className: "right-[3%] top-[30%] rotate-[7deg]", delay: 1.3 },
];

// Hero option C: the whole hero is a canvas the visitor paints on.
export default function HeroPaint() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-cream flex items-center pt-28 pb-20 overflow-hidden"
    >
      <PaintCanvas targetRef={sectionRef} reduceMotion={reduceMotion} />
      <div className="absolute inset-0 paper-grain pointer-events-none" />

      {/* Framed photos pinned to the sides on wide screens */}
      {sidePieces.map((piece) => (
        <motion.figure
          key={piece.alt}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: piece.delay }}
          className={`hidden 2xl:block absolute w-56 bg-white p-2.5 pb-8 rounded-md shadow-card pointer-events-none ${piece.className}`}
        >
          <img src={piece.src} alt={piece.alt} className="w-full aspect-[4/5] object-cover rounded-sm" />
        </motion.figure>
      ))}

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <HeroHeadline centered />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden md:flex items-center justify-center gap-2 mt-10 font-hand text-2xl text-berry"
        >
          <motion.span
            animate={reduceMotion ? undefined : { rotate: [0, 20, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            ✦
          </motion.span>
          go ahead — move your cursor to paint
        </motion.p>
      </div>
    </section>
  );
}
