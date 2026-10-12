import WatercolorBackground from "./WatercolorBackground";
import HeroHeadline from "./HeroHeadline";
import FloatingCollage from "./FloatingCollage";

// Hero option A+B: drifting watercolor + floating collage of real gallery pieces.
export default function HeroGallery({ artworks }) {
  return (
    <section className="relative min-h-screen bg-cream flex items-center pt-28 pb-20 overflow-hidden">
      <WatercolorBackground intensity={0.4} />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        <HeroHeadline />
        <FloatingCollage artworks={artworks} />
      </div>
    </section>
  );
}
