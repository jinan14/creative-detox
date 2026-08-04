import { useState } from "react";
import { FiZap } from "react-icons/fi";
import api from "../../api/axios";

export default function GenerateDescriptionButton({ title, type, onGenerated }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!title || !title.trim()) return;

    setError("");
    setGenerating(true);
    try {
      const { data } = await api.post("/ai/generate-description", { title, type });
      onGenerated(data.description);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't generate a description.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={!title.trim() || generating}
        className="flex items-center gap-1.5 text-xs font-body font-medium text-teal hover:text-teal/70 disabled:opacity-40 disabled:hover:text-teal transition-colors"
      >
        <FiZap size={13} />
        {generating ? "Generating..." : "Generate with AI"}
      </button>
      {error && <p className="text-xs text-berry font-body">{error}</p>}
    </div>
  );
}
