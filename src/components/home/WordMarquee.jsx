const words = ["Paint", "Breathe", "Create", "Heal", "Connect", "Carve", "Express", "Unwind"];

// Slow ribbon of words, alternating filled and outlined lettering.
export default function WordMarquee() {
  const row = (hidden) => (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {words.map((word, i) => (
        <span key={word} className="flex items-center">
          <span
            className={`font-display italic text-4xl md:text-6xl font-bold px-6 md:px-10 ${
              i % 2 === 0
                ? "text-teal"
                : "text-transparent [-webkit-text-stroke:1.5px_var(--color-berry)]"
            }`}
          >
            {word}
          </span>
          <span className="text-berry text-2xl md:text-3xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative py-8 md:py-10 bg-white overflow-hidden border-y border-teal/10">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
