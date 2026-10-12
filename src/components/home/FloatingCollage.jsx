import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { resolveThumbnailUrl, fallbackToFullImage } from "../../utils/resolveImageUrl";
import { workshopImages } from "../../data/images";
import gypsumSample1 from "../../assets/gypsumSample1.jpg";

// Used when the gallery has fewer artworks than frames (or the API is down).
const fallbackPieces = [
  { image: workshopImages.vitray, caption: "Stained glass" },
  { image: gypsumSample1, caption: "Gypsum carving" },
  { image: workshopImages.collage, caption: "Collage art" },
  { image: workshopImages.cups, caption: "Painted cups" },
  { image: workshopImages.results, caption: "Workshop results" },
];

// Position, tilt and parallax depth for each frame (bigger depth = moves more).
const frames = [
  { className: "left-[2%] top-[6%] w-[46%]", rotate: -7, depth: 26, float: 6 },
  { className: "right-[0%] top-[0%] w-[40%]", rotate: 6, depth: 44, float: 7 },
  { className: "left-[0%] bottom-[4%] w-[38%]", rotate: 5, depth: 58, float: 5.5 },
  { className: "right-[4%] bottom-[0%] w-[44%]", rotate: -5, depth: 34, float: 6.5 },
  { className: "left-[27%] top-[26%] w-[46%] z-20", rotate: -2, depth: 70, float: 8 },
];

function Frame({ piece, frame, index, pointerX, pointerY, scrollProgress, reduceMotion }) {
  const x = useTransform([pointerX, scrollProgress], ([px, s]) => px * frame.depth + s * frame.rotate * 30);
  const y = useTransform([pointerY, scrollProgress], ([py, s]) => py * frame.depth - s * frame.depth * 4);
  const rotate = useTransform(scrollProgress, (s) => frame.rotate + s * frame.rotate * 3);

  return (
    <motion.div
      className={`absolute ${frame.className}`}
      style={reduceMotion ? { rotate: frame.rotate } : { x, y, rotate }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.figure
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: frame.float, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        whileHover={{ scale: 1.05, rotate: -frame.rotate, zIndex: 30 }}
        className="bg-white p-2.5 pb-3 rounded-md shadow-card"
      >
        <img
          src={resolveThumbnailUrl(piece.image)}
          onError={fallbackToFullImage(piece.image)}
          alt={piece.caption}
          className="w-full aspect-[4/5] object-cover rounded-sm"
          draggable={false}
        />
        <figcaption className="font-hand text-lg md:text-xl text-neutral-600 text-center mt-1.5 truncate">
          {piece.caption}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default function FloatingCollage({ artworks = [] }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const pieces = [
    ...artworks.map((a) => ({ image: a.image, caption: `${a.title} — ${a.artist}` })),
    ...fallbackPieces,
  ].slice(0, frames.length);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative h-[440px] sm:h-[560px] lg:h-[620px]"
    >
      {pieces.map((piece, i) => (
        <Frame
          key={i}
          piece={piece}
          frame={frames[i]}
          index={i}
          pointerX={pointerX}
          pointerY={pointerY}
          scrollProgress={scrollYProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
