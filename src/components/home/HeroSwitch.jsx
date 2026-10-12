// TEMPORARY: lets us compare the two hero designs in the browser.
// Delete this component (and the switch in Home.jsx) once one is picked.
const options = [
  { value: "gallery", label: "Gallery" },
  { value: "paint", label: "Paint" },
];

export default function HeroSwitch({ value, onChange }) {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-full bg-white/95 backdrop-blur p-1 pl-3 shadow-card border border-neutral-200 font-body text-xs">
      <span className="text-neutral-500 mr-1">Hero preview</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
            value === option.value ? "bg-berry text-white" : "text-teal hover:bg-teal/10"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
